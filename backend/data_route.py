from flask import Blueprint, request, jsonify
from datetime import datetime

from data_services import process_data

data_bp = Blueprint("data_bp", __name__)
socketio = None

def init_socketio(sio):
    global socketio
    socketio = sio


@data_bp.route("/data", methods=["POST"])
def receive_data():

    data = request.get_json(force=True)

    result = process_data(data)

    result["timestamp"] = datetime.now().strftime("%H:%M:%S.%f")
    result["id"] = datetime.now().timestamp()

    # 🔥 FLAG UNIQUE D’ALERTE
    result["is_alert"] = (result.get("etat") == "alerte")

    # 📡 UN SEUL EVENT
    if socketio:
        socketio.emit("iot_update", result)

    return jsonify(result), 200