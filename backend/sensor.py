import requests
import random
import time

URL = "http://127.0.0.1:5000/data"

cycle = 0

while True:
    cycle += 1

    scenario = random.choices(
        ["calme", "normal", "agite"],
        weights=[0.4, 0.4, 0.2]
    )[0]

    # =========================
    # 👶 SCENARIOS REALISTES
    # =========================
    if scenario == "calme":
        mouvement = 0
        son = random.randint(10, 35)
        temperature = random.randint(18, 24)

    elif scenario == "normal":
        mouvement = random.choice([0, 1])
        son = random.randint(30, 65)
        temperature = random.randint(22, 30)

    else:  # agité
        mouvement = 1
        son = random.randint(70, 100)
        temperature = random.randint(30, 39)

    data = {
        "mouvement": mouvement,
        "son": son,
        "temperature": temperature,
        "timestamp": time.strftime("%H:%M:%S")
    }

    try:
        # =========================
        # 📡 REQUEST STABLE
        # =========================
        response = requests.post(
            URL,
            json=data,
            timeout=3
        )

        response.raise_for_status()

        result = response.json()

        print("\n========================")
        print("CYCLE:", cycle)
        print("SCENARIO:", scenario)
        print("Sent:", data)
        print("📡 ETAT:", result.get("etat"))
        print("👶 ACTIVITE:", result.get("activite"))

    except requests.exceptions.ConnectionError:
        print("❌ Backend not reachable (Socket server down)")

    except requests.exceptions.Timeout:
        print("⏳ Timeout - backend too slow")

    except Exception as e:
        print("❌ Error:", e)

    # =========================
    # ⏱ REALISTIC IOT TIMING
    # =========================
    time.sleep(random.uniform(1.5, 3))