import sounddevice as sd
import numpy as np
import librosa
import joblib
import requests
import tempfile
import time
import scipy.io.wavfile as wav
import os

# =========================
# CONFIG
# =========================
SAMPLE_RATE = 22050
DURATION = 5

FLASK_URL = "http://172.20.10.3:5000/data"

CONFIDENCE_THRESHOLD = 0.45
SEND_INTERVAL = 0.3

# =========================
# LOAD MODEL
# =========================
print("📦 Loading AI model...")

model = joblib.load("audio_model.pkl")
labels = joblib.load("labels.pkl")
reverse_labels = {v: k for k, v in labels.items()}

print("🎤 AUDIO CLIENT READY")

# =========================
# RECORD AUDIO
# =========================
def record_audio():
    audio = sd.rec(
        int(DURATION * SAMPLE_RATE),
        samplerate=SAMPLE_RATE,
        channels=1,
        dtype="float32"
    )
    sd.wait()
    return np.squeeze(audio)

# =========================
# FEATURES
# =========================
def extract_features(path):
    audio, sr = librosa.load(path, sr=SAMPLE_RATE)
    mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=20)
    return np.mean(mfcc.T, axis=0)

# =========================
# PREDICTION LOGIC (ENRICHED)
# =========================
def predict(audio):

    temp_path = None

    try:
        # =========================
        # NORMALISATION
        # =========================
        if np.max(np.abs(audio)) != 0:
            audio = audio / np.max(np.abs(audio))

        # =========================
        # ENERGY
        # =========================
        energy = float(np.sum(audio ** 2))
        print(f"ENERGY = {round(energy, 2)}")

        # =========================
        # SAVE TEMP AUDIO
        # =========================
        temp_path = tempfile.mktemp(suffix=".wav")
        wav.write(temp_path, SAMPLE_RATE, (audio * 32767).astype(np.int16))

        # =========================
        # FEATURES + MODEL
        # =========================
        features = extract_features(temp_path)
        proba = model.predict_proba([features])[0]

        pred_index = int(np.argmax(proba))
        confidence = float(np.max(proba))
        label = reverse_labels.get(pred_index, "unknown")

        print("PROBA =", proba)
        print("LABEL =", label)
        print("CONFIDENCE =", round(confidence, 3))

        # =========================
        # LOGIC FINAL
        # =========================
        valid_labels = ["cry", "sleep", "voice", "noise"]

        if confidence >= CONFIDENCE_THRESHOLD and label in valid_labels:
            final_label = label
            final_conf = confidence * 100
        else:
            if energy < 1500:
                final_label = "silence"
            else:
                final_label = "noise"

            final_conf = 100.0

        # =========================
        # CLEAN PROBA
        # =========================
        proba_list = [float(x) for x in proba]

        # =========================
        # DEBUG FINAL
        # =========================
        print("🧠 AUDIO FINAL:", {
            "source": "audio_pc",
            "label": final_label,
            "confidence": round(final_conf, 2),
            "energy": round(energy, 4),
            "proba": proba_list
        })

        return final_label, final_conf, energy, proba_list

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)

# =========================
# SEND BACKEND
# =========================
def send_to_backend(payload):
    try:
        requests.post(FLASK_URL, json=payload, timeout=2)
    except:
        print("⚠️ Backend unreachable")

# =========================
# MAIN LOOP
# =========================
def main():

    print("🚀 AUDIO ENGINE STARTED")

    while True:
        try:
            print("\n🎙 Recording audio...")

            audio = record_audio()

            label, confidence, energy, proba = predict(audio)

            payload = {
                "source": "audio_pc",
                "label": label,
                "confidence": round(confidence, 2),

                # 🔥 NEW ENRICHED DATA
                "energy": round(energy, 4),
                "proba": proba
            }

            print("📤 SENT:", payload)

            send_to_backend(payload)

            time.sleep(SEND_INTERVAL)

        except Exception as e:
            print("❌ ERROR:", e)
            time.sleep(1)

# =========================
# RUN
# =========================
if __name__ == "__main__":
    main()