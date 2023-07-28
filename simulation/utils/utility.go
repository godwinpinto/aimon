package util

import (
	"fmt"
	"math/rand"
	"time"
)

func RandomIndex(min, max int) int {
	// Seed the random number generator using the current time
	rand.Seed(time.Now().UnixNano())

	// Calculate the range and add 1 to include the upper bound
	rangeSize := max - min + 1

	// Generate a random number in the range and add the minimum value
	randomNum := rand.Intn(rangeSize) + min

	return randomNum
}

func RandomIP() string {
	rand.Seed(time.Now().UnixNano())

	// Generate random numbers for each octet
	octet1 := rand.Intn(256)
	octet2 := rand.Intn(256)
	octet3 := rand.Intn(256)
	octet4 := rand.Intn(256)

	// Format the IP address
	ipAddress := fmt.Sprintf("%d.%d.%d.%d", octet1, octet2, octet3, octet4)

	return ipAddress
}

func SubstringTo30Chars(str string) string {
	if len(str) > 30 {
		return str[:30]
	}
	return str
}
