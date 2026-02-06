package main

import (
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func connectRabbit() (*amqp.Connection, *amqp.Channel) {
	var conn *amqp.Connection
	var err error

	rabbitURL := "amqp://" + getEnv("RABBITMQ_HOST") + ":5672/"

	for i := 1; i <= 10; i++ {
		log.Printf("Connecting to RabbitMQ (attempt %d)...", i)

		conn, err = amqp.Dial(rabbitURL)
		if err == nil {
			break
		}

		log.Println("RabbitMQ not ready, retrying in 3s...")
		time.Sleep(3 * time.Second)
	}

	if err != nil {
		log.Fatal("Could not connect to RabbitMQ:", err)
	}

	ch, err := conn.Channel()
	if err != nil {
		log.Fatal("Channel error:", err)
	}

	_, err = ch.QueueDeclare(
		getEnv("RABBITMQ_QUEUE"),
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatal("Queue declare error:", err)
	}

	return conn, ch
}
