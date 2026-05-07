import requests
import random
import time

URL = "http://127.0.0.1:5000/data"

cycle = 0

while True:

    cycle += 1

    # 🎯 scénarios bébé (plus réaliste que full random)
    scenario = random.choice(["calme", "normal", "agite"])

    if scenario == "calme":
        data = {
            "mouvement": 0,
            "son": random.randint(20, 40),
            "temperature": random.randint(18, 24)
        }

    elif scenario == "normal":
        data = {
            "mouvement": random.choice([0, 1]),
            "son": random.randint(35, 65),
            "temperature": random.randint(22, 30)
        }

    else:  # 🔥 agité (génère alertes)
        data = {
            "mouvement": random.choice([0, 1]),
            "son": random.randint(70, 95),
            "temperature": random.randint(30, 39)
        }

    try:
        response = requests.post(URL, json=data)

        print("\n========================")
        print("CYCLE:", cycle)
        print("SCENARIO:", scenario)
        print("Sent:", data)
        print("Response:", response.json())

    except Exception as e:
        print("Server not running:", e)

    time.sleep(5)