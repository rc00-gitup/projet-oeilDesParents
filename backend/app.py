from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import time

from services.ai_engine import AIEngine

app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

engine = AIEngine()

# =========================
# STATE GLOBAL CLEAN
# =========================
state = {
    "camera": {"presence": 0, "mouvement": 0},
    "sensor": {"pir": 0, "temperature": 0, "sound_sensor": 0},
    "audio_pc": {
        "label": "silence",
        "confidence": 100
    },
    "last_audio_time": 0
}

AUDIO_TIMEOUT = 10


@app.route("/")
def home():
    return "Baby Monitor IA OK"


@app.route("/data", methods=["POST"])
def data():
    global state

    payload = request.json or {}
    source = payload.get("source")
    now = time.time()

    # =========================
    # RASPBERRY
    # =========================
    if source == "raspberry":
        state["camera"] = payload.get("camera", state["camera"])
        state["sensor"] = payload.get("sensor", state["sensor"])

    # =========================
    # AUDIO PC (ONLY MODIFIED PART)
    # =========================
    elif source == "audio_pc":

        label = payload.get("label")
        confidence = payload.get("confidence")

        # 🔥 NEW OPTIONAL ENRICHMENT FIELDS (SAFE ADDITION)
        energy = payload.get("energy")
        proba = payload.get("proba")

        if label is not None:
            state["audio_pc"] = {
                "label": label,
                "confidence": confidence,
                "energy": energy,
                "proba": proba
            }
            state["last_audio_time"] = now

            print("🎧 AUDIO REÇU:", state["audio_pc"])

    # =========================
    # AUDIO TIMEOUT LOGIC (UNCHANGED)
    # =========================
    if now - state["last_audio_time"] > AUDIO_TIMEOUT:
        audio_use = {"label": "silence", "confidence": 100}
    else:
        audio_use = state["audio_pc"]

    # =========================
    # IA ENGINE (UNCHANGED)
    # =========================
    result = engine.decide(
        state["camera"],
        audio_use,
        state["sensor"]
    )

    # ⚠️ SOCKET EVENT UNIQUE (UNCHANGED)
    socketio.emit("iot_update", result)

    print("📡 DATA IA:", result)

    return jsonify(result)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)