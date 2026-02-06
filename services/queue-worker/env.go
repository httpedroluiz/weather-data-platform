package main

import (
	"log"
	"os"
)

func getEnv(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("Missing environment variable: %s", key)
	}
	return value
}
