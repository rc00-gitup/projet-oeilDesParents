import time
import requests
from threading import Thread

from core.camera_stream import get_latest_frame, get_camera_data
from core.sensors import get_sensor_data
from core.led_controller import set_led, cleanup
from core.video_server import app

FLASK_URL = "http://172.20.10.3:5000/data"
SEND_INTERVAL = 1

print("🚀 Raspberry Baby Monitor Started")


# =========================
# VIDEO SERVER
# =========================

def start_video_server():
    print("🎥 Video Server Started")
    print("🌍 http://172.20.10.2:8080")

    app.run(
        host="0.0.0.0",
        port=8080,
        threaded=True,
        use_reloader=False
    )


Thread(target=start_video_server, daemon=True).start()


# =========================
# MAIN LOOP
# =========================

def main():

    try:
        while True:

            frame = get_latest_frame()

            if frame is None:
                time.sleep(0.05)
                continue

            camera = get_camera_data()
            sensors = get_sensor_data()

            payload = {
                "source": "raspberry",
                "camera": camera,
                "sensor": sensors
            }

            try:
                requests.post(
                    FLASK_URL,
                    json=payload,
                    timeout=2
                )

                # 🔥 TON FORMAT EXACT
                print(f"📡 SENT (RASPBERRY): {payload}")

            except requests.exceptions.RequestException as e:
                print("❌ Backend unreachable:", e)

            set_led(camera.get("state", "unknown"))

            time.sleep(SEND_INTERVAL)

    except KeyboardInterrupt:
        print("🛑 Stopping...")

    finally:
        cleanup()


if __name__ == "__main__":
    main()
