package handler

import (
	"analytics-api/database"
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type TransactionOverviewDetailsStruct struct {
	RowId      string    `json:"id" gorm:"column:ARM_ROW_ID"`
	UserId     string    `json:"user_id" gorm:"column:USER_ID"`
	UserAction string    `json:"action" gorm:"column:USER_ACTION"`
	CreatedDt  time.Time `json:"created_dt" gorm:"column:CREATED_DATETIME"`
	Domain     string    `json:"domain" gorm:"column:URL_DOMAIN"`
	Content    string    `json:"content" gorm:"column:CONTENT_SHORT"`
}
type TransactionOverviewDetailsReqStruct struct {
	Action string `json:"action"`
}

func TransactionOverviewDetails(w http.ResponseWriter, request *http.Request) {

	if request.Method != http.MethodPost {
		http.Error(w, "Invalid HTTP method", http.StatusMethodNotAllowed)
		return
	}
	var requestData TransactionOverviewDetailsReqStruct
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&requestData); err != nil {
		http.Error(w, "Failed to parse JSON request", http.StatusBadRequest)
		return
	}
	gormDB, err := database.InitializeDB()
	if err != nil {
		log.Fatal("failed to connect to the database", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var results []TransactionOverviewDetailsStruct
	result := gormDB.Raw(`SELECT ARM_ROW_ID , USER_ID,USER_ACTION , CREATED_DATETIME , URL_DOMAIN , CONTENT_SHORT 
	FROM AUDIT_REQUEST_MASTER arm , AUDIT_BLACKLIST_DOMAIN_MASTER abdm 
	WHERE arm.URL_DOMAIN =abdm.DOMAIN_NAME 
	AND arm.CREATED_DATETIME >=DATE_SUB(NOW(), INTERVAL 24 HOUR)
	AND arm.USER_ACTION=?
	ORDER BY CREATED_DATETIME DESC 
	LIMIT 200
	`, requestData.Action).Scan(&results)

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
