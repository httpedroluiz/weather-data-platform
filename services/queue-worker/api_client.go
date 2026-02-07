package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"fmt"
)

func sendToAPI(payload WeatherMessage) error {
	url := getEnv("API_BASE_URL") + getEnv("WEATHER_ENDPOINT")

	body, _ := json.Marshal(payload)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		return fmt.Errorf("API returned status %d", resp.StatusCode)
	}


	return nil
}
