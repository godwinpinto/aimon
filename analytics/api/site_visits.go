package handler

import (
	"analytics-api/database"
	"encoding/json"
	"log"
	"net/http"
)

type SiteVisitsStruct struct {
	CountDomain int    `json:"count" gorm:"column:COUNT_DOMAIN"`
	Domain      string `json:"domain" gorm:"column:URL_DOMAIN"`
}

func SiteVisits(w http.ResponseWriter, request *http.Request) {

	gormDB, err := database.InitializeDB()
	if err != nil {
		log.Fatal("failed to connect to the database", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var results []SiteVisitsStruct
	result := gormDB.Raw(`SELECT COUNT(URL_DOMAIN) COUNT_DOMAIN,URL_DOMAIN FROM AUDIT_REQUEST_MASTER arm 
	WHERE CREATED_DATETIME >=DATE_SUB(NOW(), INTERVAL 24 HOUR)
	GROUP BY URL_DOMAIN
	ORDER BY 1 DESC
	LIMIT 10
	`).Scan(&results)

	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	if result.RowsAffected <= 0 {
		http.Error(w, "No Records", http.StatusNotFound)
		return
	}

	// Convert the array of structs to JSON
	data, err := json.Marshal(results)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}
