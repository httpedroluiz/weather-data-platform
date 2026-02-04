import time
from weather_client import fetch_weather
from producer import send_to_queue

INTERVAL = 60 * 60  # 1 hora

def run():
    while True:
        try:
            weather = fetch_weather()
            send_to_queue(weather)
            print("Weather sent:", weather)
        except Exception as e:
            print("Error:", e)

        time.sleep(INTERVAL)

if __name__ == "__main__":
    run()
