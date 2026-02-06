package main

type WeatherMessage struct {
	Temperature float64 `json:"temperature"`
	Windspeed   float64 `json:"windspeed"`
	WeatherCode int     `json:"weathercode"`
	Time        string  `json:"time"`
	Latitude    string  `json:"latitude"`
	Longitude   string  `json:"longitude"`
}
