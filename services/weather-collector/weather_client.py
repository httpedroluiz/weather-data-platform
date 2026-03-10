import requests
import os
import time

WEATHER_TIMEOUT = 15
WEATHER_MAX_RETRIES = 3
WEATHER_RETRY_DELAY = 2

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

    url = os.getenv("WEATHER_API_URL")
    last_error = None
    for attempt in range(WEATHER_MAX_RETRIES):
        try:
            response = requests.get(url, params=params, timeout=WEATHER_TIMEOUT)
            response.raise_for_status()
            break
        except (requests.exceptions.RequestException, requests.exceptions.Timeout) as e:
            last_error = e
            if attempt < WEATHER_MAX_RETRIES - 1:
                time.sleep(WEATHER_RETRY_DELAY)
            else:
                raise last_error
    data = response.json()

    current = data["current_weather"]
    hourly = data["hourly"]
    daily = data["daily"]
    h = hourly.get("relativehumidity_2m") or []
    c = hourly.get("cloudcover") or []
    dmax = daily.get("temperature_2m_max") or []
    dmin = daily.get("temperature_2m_min") or []
    return {
        "temperature": current.get("temperature"),
        "windspeed": current.get("windspeed"),
        "weatherCode": current.get("weathercode"),
        "humidity": h[0] if len(h) > 0 else None,
        "cloudCover": c[0] if len(c) > 0 else None,
        "temperatureMax": dmax[0] if len(dmax) > 0 else None,
        "temperatureMin": dmin[0] if len(dmin) > 0 else None,
        "city": os.getenv("WEATHER_CITY") or "",
        "time": current.get("time"),
        "latitude": params["latitude"],
        "longitude": params["longitude"]
    }