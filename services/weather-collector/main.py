import time
from weather_client import fetch_weather
from producer import send_to_queue

INTERVAL = 60

def run():
    while True:
        try:
            weather = fetch_weather()
            send_to_queue(weather)
            print("Weather sent:", weather)
        except Exception as e:
            print("Error:", type(e).__name__, str(e) or repr(e))

        time.sleep(INTERVAL)

if __name__ == "__main__":
    run()
