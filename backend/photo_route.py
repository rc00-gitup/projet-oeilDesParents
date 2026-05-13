from flask import Blueprint, request, jsonify
import base64
import time
import os

photo_bp = Blueprint("photo", __name__)

PHOTO_DIR = "photos"
os.makedirs(PHOTO_DIR, exist_ok=True)

# 🔒 anti doublon simple (mémoire runtime)
last_saved_timestamp = set()

@photo_bp.route("/photo", methods=["POST"])
def save_photo():

    data = request.json

    image = data.get("image")
    timestamp = data.get("timestamp")

    # ❌ image absente
    if not image:
        print("❌ IMAGE VIDE REÇUE")
        return jsonify({"status": "error", "message": "no image"}), 400

    # 🔒 anti duplication backend
    if timestamp in last_saved_timestamp:
        print("⚠️ IMAGE DUPLIQUÉE IGNORÉE:", timestamp)
        return jsonify({"status": "duplicate"}), 200

    try:

        # 🧹 remove base64 header
        if "," in image:
            image_data = image.split(",")[1]
        else:
            image_data = image

        decoded = base64.b64decode(image_data)

        # ❌ image vide après decode
        if len(decoded) == 0:
            print("❌ IMAGE DECODE VIDE")
            return jsonify({"status": "error"}), 400

        # 📸 filename unique
        filename = f"{PHOTO_DIR}/photo_{int(time.time() * 1000)}.jpg"

        with open(filename, "wb") as f:
            f.write(decoded)

        # 🔒 mark timestamp as saved
        if timestamp:
            last_saved_timestamp.add(timestamp)

        print("📸 PHOTO SAUVEGARDEE:", filename)

        return jsonify({
            "status": "success",
            "file": filename
        })

    except Exception as e:

        print("❌ ERREUR IMAGE:", e)

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500