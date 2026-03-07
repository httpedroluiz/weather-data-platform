package main

import (
	"encoding/json"
	"log"
	"time"
	"net/http"
)

func waitForAPI() {
	log.Println("Waiting for API...")
	for {
		resp, err := http.Get(getEnv("API_BASE_URL") + "/health")
		if err == nil && resp.StatusCode == 200 {
			log.Println("API is ready")
			return
		}
		time.Sleep(5 * time.Second)
	}
}

func main() {
	waitForAPI()
	
	conn, ch := connectRabbit()
	defer conn.Close()
	defer ch.Close()

	msgs, err := ch.Consume(
		getEnv("RABBITMQ_QUEUE"),
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Worker waiting for messages...")

	for msg := range msgs {
		var payload WeatherMessage

		err := json.Unmarshal(msg.Body, &payload)
		if err != nil {
			log.Println("Invalid message:", err)
			msg.Nack(false, false)
			continue
		}

		err = sendToAPI(payload)
		if err != nil {
			log.Println("API error:", err)
			msg.Nack(false, true)
			continue
		}

		msg.Ack(false)
		log.Println("Message processed")
	}
}
