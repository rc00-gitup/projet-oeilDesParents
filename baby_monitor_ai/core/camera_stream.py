from picamera2 import Picamera2
import cv2
import time
from collections import deque
from threading import Thread, Lock

# ===================================================
# CAMERA
# ===================================================

picam2 = Picamera2()

config = picam2.create_preview_configuration(
    main={"size": (640, 480)}
)

picam2.configure(config)
picam2.start()

time.sleep(2)

# ===================================================
# SHARED FRAME
# ===================================================

latest_frame = None
frame_lock = Lock()


def camera_loop():
    global latest_frame

    while True:
        frame = picam2.capture_array()

        with frame_lock:
            latest_frame = frame

        time.sleep(0.02)


Thread(target=camera_loop, daemon=True).start()

# ===================================================
# CASCADES
# ===================================================

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)

eye_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_eye.xml"
)

# ===================================================
# MEMORY
# ===================================================

previous_gray = None

presence_history = deque(maxlen=5)

eye_history = deque(maxlen=6)

eyes_closed_start = None

MOTION_THRESHOLD = 1200
PRESENCE_THRESHOLD = 500

SLEEP_DELAY = 1.5

# ===================================================
# CAMERA ANALYSIS
# ===================================================


def get_camera_data():

    global previous_gray
    global eyes_closed_start

    with frame_lock:

        if latest_frame is None:
            return {
                "presence": 0,
                "mouvement": 0,
                "eyes_open": 0,
                "sleep": 0,
                "state": "init",
                "motion_score": 0
            }

        frame = latest_frame.copy()

    gray = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2GRAY
    )

    # ===================================================
    # MOTION
    # ===================================================

    motion_score = 0
    mouvement = 0

    if previous_gray is not None:

        diff = cv2.absdiff(
            previous_gray,
            gray
        )

        diff = cv2.GaussianBlur(
            diff,
            (5, 5),
            0
        )

        _, thresh = cv2.threshold(
            diff,
            30,
            255,
            cv2.THRESH_BINARY
        )

        motion_score = cv2.countNonZero(thresh)

    previous_gray = gray

    # ===================================================
    # FACE
    # ===================================================

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(60, 60)
    )

    face_detected = len(faces) > 0

    raw_presence = (
        1 if (
            face_detected or
            motion_score > PRESENCE_THRESHOLD
        ) else 0
    )

    presence_history.append(raw_presence)

    if len(presence_history) == presence_history.maxlen:
        presence = 1 if sum(presence_history) >= 2 else 0
    else:
        presence = raw_presence

    # ===================================================
    # MOVEMENT
    # ===================================================

    if presence and motion_score > MOTION_THRESHOLD:
        mouvement = 1

    # ===================================================
    # EYES
    # ===================================================

    eyes_open = 0
    sleep = 0

    if presence and len(faces):

        x, y, w, h = max(
            faces,
            key=lambda f: f[2] * f[3]
        )

        # seulement la moitié haute du visage
        roi = gray[
            y:y + int(h * 0.55),
            x:x + w
        ]

        roi = cv2.equalizeHist(roi)

        eyes = eye_cascade.detectMultiScale(
            roi,
            scaleFactor=1.1,
            minNeighbors=4,
            minSize=(18, 18)
        )

        detected = 1 if len(eyes) >= 1 else 0

        eye_history.append(detected)

        # majorité des derniers frames
        if len(eye_history):

            eyes_open = (
                1
                if sum(eye_history) >= len(eye_history)//2
                else 0
            )

        if eyes_open:

            eyes_closed_start = None

        else:

            if eyes_closed_start is None:
                eyes_closed_start = time.time()

            elif time.time() - eyes_closed_start > SLEEP_DELAY:
                sleep = 1

    else:

        eyes_closed_start = None
        eye_history.clear()

    # ===================================================
    # STATE
    # ===================================================

    if presence == 0:
        state = "absent"

    elif sleep == 1:
        state = "sleep"

    elif mouvement == 1:
        state = "active"

    else:
        state = "awake"

    print(
        f"faces={len(faces)} | "
        f"motion={motion_score} | "
        f"presence={presence} | "
        f"eyes={eyes_open} | "
        f"sleep={sleep} | "
        f"state={state}"
    )

    return {
        "presence": presence,
        "mouvement": mouvement,
        "eyes_open": eyes_open,
        "sleep": sleep,
        "state": state,
        "motion_score": motion_score
    }

# ===================================================
# FRAME ACCESS
# ===================================================


def get_latest_frame():

    with frame_lock:

        if latest_frame is None:
            return None

        return latest_frame.copy()
