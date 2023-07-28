package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/otiai10/openaigo"
)

func DateToString(date time.Time) string {
	return date.Format("2006-01-02 15:04:05") // Format based on your requirement
}

func StringToDate(dateString string) (time.Time, error) {
	layout := "2006-01-02 15:04:05" // Format based on the input string

	return time.Parse(layout, dateString)
}

func GetTagsFromChatGPT(input string, apiKey string) (string, error) {
	client := openaigo.NewClient(apiKey)
	request := openaigo.ChatRequest{
		Model: openaigo.GPT3_5Turbo,
		Messages: []openaigo.Message{
			{Role: "system", Content: `pretend to be an expert article writer. Create a list of tags (which may also include programing languages used) for the below article.
										Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
										{
											"tags": [{"each tags as an array"}]
										}
										`},
			{Role: "system", Content: "You article is : " + input},
			/* {Role: "system", Content: "You are a technical writer for blogs."},
			{Role: "system", Content: "You Input is : " + input},
			{Role: "user", Content: "Now provide only an array of tags to mark this article in json g"}, */
		},
	}

	res, err := client.Chat(context.Background(), request)

	if err != nil {
		return "", err
	}
	fmt.Println("++++++++++++++")
	fmt.Println(input)
	fmt.Println("==================")
	fmt.Println(res.Choices[0].Message.Content)
	fmt.Println("++++++++++++++")
	return res.Choices[0].Message.Content, nil

}

func MergeArraysFromJSON(inputJSON string) ([]string, error) {
	var data map[string][]string
	err := json.Unmarshal([]byte(inputJSON), &data)
	if err != nil {
		return nil, err
	}

	// Merge the nested arrays into one array
	var mergedArray []string
	for _, arr := range data {
		mergedArray = append(mergedArray, arr...)
	}

	return mergedArray, nil
}
