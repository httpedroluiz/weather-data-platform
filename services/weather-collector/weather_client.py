import requests
import os

def fetch_weather():
    params = {
        "latitude": os.getenv("WEATHER_LAT"),
        "longitude": os.getenv("WEATHER_LON"),

        "current_weather": True,

        "hourly": [
            "temperature_2m",
            "relativehumidity_2m",
            "precipitation_probability",
            "windspeed_10m",
            "cloudcover"
        ],

        "daily": [
            "temperature_2m_max",
            "temperature_2m_min"
        ],

        "timezone": "auto"
    }

    response = requests.get(
        os.getenv("WEATHER_API_URL"),
        params=params,
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    current = data["current_weather"]
    hourly = data["hourly"]
    daily = data["daily"]

    return {
        "temperature": current.get("temperature"),
        "windspeed": current.get("windspeed"),
        "weatherCode": current.get("weathercode"),

        "humidity": hourly["relativehumidity_2m"][0],
        "cloudCover": hourly["cloudcover"][0],

        "temperatureMax": daily["temperature_2m_max"][0],
        "temperatureMin": daily["temperature_2m_min"][0],

        "city": os.getenv("WEATHER_CITY"),

        "time": current.get("time"),
        "latitude": params["latitude"],
        "longitude": params["longitude"]
    }