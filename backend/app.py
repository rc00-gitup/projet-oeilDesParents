import eventlet
eventlet.monkey_patch()

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode="eventlet"
)

@app.route("/")
def home():
    return "Backend running 🚀"

@app.route("/data", methods=["POST"])
def data():
    payload = request.json

    son = payload.get("son", 0)
    temperature = payload.get("temperature", 0)
    mouvement = payload.get("mouvement", 0)

    # =========================
    # 🧠 LOGIQUE ETAT
    # =========================
    if son > 70 or temperature > 37 or (mouvement == 1 and son > 80):
        etat = "alerte"
        activite = "agité"

    elif son < 40 and temperature < 30:
        etat = "normal"
        activite = "dort"

    else:
        etat = "vigilance"
        activite = "calme"

    # =========================
    # 📦 PAYLOAD FINAL
    # =========================
    enriched_payload = {
        "son": son,
        "temperature": temperature,
        "mouvement": mouvement,
        "timestamp": payload.get("timestamp"),
        "etat": etat,
        "activite": activite
    }

    # =========================
    # 📡 EMIT SOCKET
    # =========================
    socketio.emit("iot_update", enriched_payload)

    print("📤 SENT:", enriched_payload)

    return jsonify(enriched_payload)

@socketio.on("connect")
def connect():
    print("🟢 Client connected")

if __name__ == "__main__":
    socketio.run(app, host="127.0.0.1", port=5000, debug=True)