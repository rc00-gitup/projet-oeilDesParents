from flask import Blueprint, request, jsonify
from data_services import process_data

data_bp = Blueprint("data_bp", __name__)  # 👈 DOIT ÊTRE ICI

# mémoire temporaire
last_data = {
    "etat": "normal",
    "alerte": [],
    "data": {}
}

@data_bp.route("/data", methods=["POST"])
def receive_data():
    global last_data

    data = request.get_json(force=True)

    print("📡 RAW RECEIVED:", data)

    result = process_data(data)

    print("✅ RESULTAT TRAITÉ :", result)

    last_data = result

    return jsonify(result), 200


@data_bp.route("/data", methods=["GET"])
def get_data():
    print("📤 DONNÉES ENVOYÉES AU FRONT :", last_data)
    return jsonify(last_data), 200