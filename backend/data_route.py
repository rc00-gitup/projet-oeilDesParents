from flask import Blueprint, request, jsonify
from data_services import process_data

data_bp = Blueprint("data_bp", __name__)

# mémoire temporaire (valeur par défaut sécurisée)
last_data = {
    "etat": "normal",
    "alerte": [],
    "data": {}
}

@data_bp.route("/data", methods=["POST"])
def receive_data():
    global last_data

    data = request.get_json(force=True)
    result = process_data(data)

    last_data = result
    return jsonify(result)


@data_bp.route("/data", methods=["GET"])
def get_data():
    return jsonify(last_data)