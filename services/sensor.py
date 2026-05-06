
import requests
import random
import time

URL = "http://127.0.0.1:5000/data"

while True:
    data = {
        "mouvement": random.choice([0]),
        "son": random.randint(20, 90),
        "temperature": random.randint(-50, 555)
    }

    try:
        response = requests.post(URL, json=data)
        print("Sent:", data)
        print("Response:", response.json())
    except:
        print("Server not running")
    time.sleep(5)