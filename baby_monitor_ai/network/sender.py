import requests
from config.settings import BACKEND_URL

def send_to_backend(data):

    try:
        requests.post(BACKEND_URL, json=data, timeout=2)
    except Exception as e:
        print("❌ send error:", e)
