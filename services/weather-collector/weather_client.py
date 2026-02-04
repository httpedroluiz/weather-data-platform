import requests
import os

def fetch_weather():
    params = {
        "latitude": os.getenv("WEATHER_LAT"),
        "longitude": os.getenv("WEATHER_LON"),
        "current_weather": True,
        "hourly": "temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m"
    }

    response = requests.get(
        os.getenv("WEATHER_API_URL"),
        params=params,
        timeout=10
    )
    response.raise_for_status()

    data = response.json()
    current = data["current_weather"]

    return {
        "temperature": current.get("temperature"),
        "windspeed": current.get("windspeed"),
        "weathercode": current.get("weathercode"),
        "time": current.get("time"),
        "latitude": params["latitude"],
        "longitude": params["longitude"]
    }
