package main

import (
	"fmt"
	"log"
	"simulation/bean"
	"simulation/database"
	util "simulation/utils"
	"time"

	"github.com/bwmarrin/snowflake"
	"gorm.io/gorm"
)

func main() {

	gormDB, err := database.InitializeDB()
	if err != nil {
		log.Fatal("failed to connect to the database", err)
		return
	}

	actionArray := []string{"C", "X", "P", "I"}

	var usernames []bean.FakeUsernameMaster
	result := gormDB.Find(&usernames)
	if result.RowsAffected == 0 || result.Error != nil {
		log.Fatal("No Records in contents", result.Error)
		return
	}
	var contents []bean.FakeDataRequestMaster
	result = gormDB.Find(&contents)
	if result.RowsAffected == 0 || result.Error != nil {
		log.Fatal("No Records in contents", result.Error)
		return
	}
	var domains []bean.FakeDomainNameMaster
	result = gormDB.Find(&domains)
	if result.RowsAffected == 0 || result.Error != nil {
		log.Fatal("No Records in contents", result.Error)
		return
	}

	// Create a new Node with a Node number of 1
	node, err := snowflake.NewNode(1)
	if err != nil {
		fmt.Println(err)
		return
	}

	interval := 5 // seconds

	for {
		go performInsert(gormDB, contents, usernames, domains, actionArray, node)
		time.Sleep(time.Duration(interval) * time.Second)
	}
}

func performInsert(db *gorm.DB, contents []bean.FakeDataRequestMaster, usernames []bean.FakeUsernameMaster, domains []bean.FakeDomainNameMaster, actions []string, node *snowflake.Node) {
	fmt.Println("Start Function")
	randomAction := actions[util.RandomIndex(0, len(actions)-1)]
	randomUserName := usernames[util.RandomIndex(0, len(usernames)-1)]
	randomDomain := domains[util.RandomIndex(0, len(domains)-1)]
	var randomContent bean.FakeDataRequestMaster

	if randomAction != "I" {
		randomContent = contents[util.RandomIndex(0, len(contents)-1)]
	} else {
		randomContent = bean.FakeDataRequestMaster{
			Content: "",
		}
	}

	uniqueId := node.Generate().String()

	insertRequest := bean.AuditRequestMaster{
		RowId:        uniqueId,
		UserId:       randomUserName.Username,
		UserIpAddr:   util.RandomIP(),
		UserAction:   randomAction,
		CreatedDt:    time.Now().UTC(),
		UrlPath:      "/",
		Timezone:     "UTC",
		ContentShort: util.SubstringTo30Chars(randomContent.Content),
		UrlDomain:    randomDomain.DomainName,
	}

	result := db.Create(&insertRequest)
	if result.Error != nil {
		fmt.Println("Error inserting data:", result.Error)
	} else {
		fmt.Println("Data inserted successfully")
	}

	if randomAction != "I" {
		insertContentFull := bean.AuditRequestContent{
			RowId:       uniqueId,
			ContentFull: randomContent.Content,
		}
		result := db.Create(&insertContentFull)
		if result.Error != nil {
			fmt.Println("Error inserting data:", result.Error)
		} else {
			fmt.Println("Data inserted successfully")
		}

	}
	fmt.Println("End Function")

}
