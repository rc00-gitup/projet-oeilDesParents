# routes/data_route.py

from flask import Blueprint, request, jsonify
from data_services import process_data

data_bp = Blueprint("data_bp", __name__)

@data_bp.route("/data", methods=["POST"])
def receive_data():
    data = request.json
    result = process_data(data)
    print(result)

    return jsonify(result)