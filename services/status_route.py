from flask import Blueprint, jsonify

from data_services import process_data

status_bp = Blueprint("status_bp",__name__)

@status_bp.route("/status", methods=["GET"])
def get_current_status():
    return jsonify(get_status())
