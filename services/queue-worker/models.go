package main

type WeatherMessage struct {
	Temperature float64 `json:"temperature"`
    Windspeed float64 `json:"windspeed"`
    WeatherCode int `json:"weathercode"`

    Humidity int `json:"humidity"`
    CloudCover int `json:"cloudCover"`

    TemperatureMax float64 `json:"temperatureMax"`
    TemperatureMin float64 `json:"temperatureMin"`

    City string `json:"city"`

    Latitude string `json:"latitude"`
    Longitude string `json:"longitude"`

    Time string `json:"time"`
}
