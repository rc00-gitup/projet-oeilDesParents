from flask import Blueprint, jsonify
from data_services import get_status

status_bp = Blueprint("status_bp", __name__)


@status_bp.route("/status", methods=["GET"])
def status():
    return jsonify(get_status())