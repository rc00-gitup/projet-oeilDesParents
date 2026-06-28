from flask import Flask, Response
import cv2

from core.camera_stream import get_latest_frame

app = Flask(__name__)

# =========================
# HOME PAGE
# =========================

@app.route("/")
def home():
    return """
    <html>
        <head>
            <title>Baby Monitor Camera</title>
        </head>

        <body style="
            background:#111827;
            color:white;
            text-align:center;
            font-family:Arial;
        ">

            <h2>🎥 Baby Monitor Live Stream</h2>

            <img src="/video_feed" width="800"
                 style="border-radius:12px; border:3px solid white;" />

        </body>
    </html>
    """

# =========================
# MJPEG STREAM
# =========================

def generate_frames():

    while True:

        frame = get_latest_frame()

        if frame is None:
            continue

        # encodage JPEG optimisé
        success, buffer = cv2.imencode(
            ".jpg",
            frame,
            [cv2.IMWRITE_JPEG_QUALITY, 80]
        )

        if not success:
            continue

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + buffer.tobytes()
            + b"\r\n"
        )

# =========================
# VIDEO ROUTE
# =========================

@app.route("/video_feed")
def video_feed():
    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )
