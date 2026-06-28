from collections import deque
import time


class AIEngine:

    def __init__(self):

        # Historique pour les prédictions
        self.timeline = deque(maxlen=30)

        # Stabilisation des changements d'état
        self.current_activity = "awake"
        self.pending_activity = None
        self.pending_count = 0

    def decide(self, camera, audio, sensors):

        label = audio.get("label", "silence")
        confidence = audio.get("confidence", 0)

        presence = camera.get("presence", 0)
        mouvement = camera.get("mouvement", 0)
        eyes_open = camera.get("eyes_open", 0)
        sleep = camera.get("sleep", 0)

        alerts = []
        score = 0

        # =========================
        # AUDIO NORMALISATION
        # =========================

        if label == "voice":
            label = "silence"
            confidence = 0

        # =========================
        # AUDIO ANALYSIS
        # =========================

        if label == "cry":

            score += 90
            alerts.append("baby_cry")

        elif label == "noise":

            score += 25
            alerts.append("noise_detected")

        # =========================
        # CAMERA ANALYSIS
        # =========================

        if presence == 0:

            score += 50
            alerts.append("baby_absent")

        if mouvement == 1:

            score += 20
            alerts.append("movement")

        # =========================
        # ACTIVITY LOGIC
        #
        # Priorité :
        # 1. crying
        # 2. absent
        # 3. sleeping
        # 4. awake
        # =========================

        if label == "cry":

            activity_candidate = "crying"

        elif presence == 0:

            activity_candidate = "absent"

        elif sleep == 1:

            activity_candidate = "sleeping"

        else:

            # présence détectée
            # yeux ouverts ou non détectés
            activity_candidate = "awake"

        # =========================
        # STABILISATION DES ÉTATS
        # =========================

        if activity_candidate == self.current_activity:

            self.pending_activity = None
            self.pending_count = 0

        else:

            if activity_candidate == self.pending_activity:

                self.pending_count += 1

            else:

                self.pending_activity = activity_candidate
                self.pending_count = 1

            # Validation après 3 détections successives

            if self.pending_count >= 3:

                self.current_activity = activity_candidate

                self.pending_activity = None
                self.pending_count = 0

        activity = self.current_activity

        # =========================
        # SYSTEM STATE
        # =========================

        score = min(score, 100)

        if score >= 80:

            state = "ALERTE"

        elif score >= 40:

            state = "VIGILANCE"

        else:

            state = "NORMAL"

        # =========================
        # MEMORY
        # =========================

        self.timeline.append({
            "time": time.time(),
            "activity": activity,
            "audio": label,
            "score": score
        })

        # =========================
        # PREDICTION
        # =========================

        prediction = "stable"

        if len(self.timeline) >= 3:

            last3 = list(self.timeline)[-3:]

            cry_count = sum(
                1
                for x in last3
                if x["audio"] == "cry"
            )

            awake_count = sum(
                1
                for x in last3
                if x["activity"] == "awake"
            )

            if cry_count >= 2:

                prediction = "baby_may_wake_up"

            elif awake_count >= 2:

                prediction = "baby_active"

            elif all(
                x["activity"] == "sleeping"
                for x in last3
            ):

                prediction = "deep_sleep"

        # =========================
        # DEBUG
        # =========================

        print(
            f"presence={presence} | "
            f"eyes={eyes_open} | "
            f"sleep={sleep} | "
            f"audio={label} | "
            f"activity={activity} | "
            f"candidate={activity_candidate} | "
            f"pending={self.pending_activity} | "
            f"count={self.pending_count} | "
            f"score={score}"
        )

        # =========================
        # RETURN
        # =========================

        return {
            "activite": activity,
            "prediction": prediction,
            "etat_systeme": state,
            "score_danger": score,
            "alertes": alerts,
            "confidence_audio": confidence,
            "data": {
                "camera": camera,
                "audio": audio,
                "sensor": sensors
            }
        }