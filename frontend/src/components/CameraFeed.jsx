import { useEffect, useRef, useState } from "react";

export default function CameraFeed({
  cameraActive,
  darkMode
}) {

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [ready, setReady] = useState(false);

  /* =========================
      CAMERA START / STOP
  ========================== */
  useEffect(() => {

    if (!cameraActive) {
      stopCamera();
      return;
    }

    startCamera();

    return () => stopCamera();

  }, [cameraActive]);

  /* =========================
      START CAMERA
  ========================== */
  const startCamera = async () => {

    // 🔒 évite double stream
    if (streamRef.current) return;

    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      streamRef.current = stream;

      const video = videoRef.current;

      if (video) {

        video.srcObject = stream;

        video.onloadedmetadata = async () => {

          await video.play();

          setReady(true);
        };
      }

    } catch (err) {

      console.error("❌ Camera error:", err);
    }
  };

  /* =========================
      STOP CAMERA
  ========================== */
  const stopCamera = () => {

    setReady(false);

    if (streamRef.current) {

      streamRef.current
        .getTracks()
        .forEach(track => track.stop());

      streamRef.current = null;
    }
  };

  /* =========================
      CLEANUP GLOBAL
  ========================== */
  useEffect(() => {

    return () => {
      stopCamera();
    };

  }, []);

  /* =========================
      UI
  ========================== */
  return (
    <div style={styles.container}>

      {cameraActive ? (

        <div style={styles.videoWrapper}>

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={styles.video}
          />

          {ready && (
            <div style={styles.liveBadge}>
              ● LIVE
            </div>
          )}

        </div>

      ) : (

        <div style={styles.offBox(darkMode)}>

          <p style={styles.text(darkMode)}>
            📷 Caméra désactivée
          </p>

        </div>
      )}

    </div>
  );
}

/* =========================
    STYLES
========================= */

const styles = {

  container: {
    width: "100%"
  },

  videoWrapper: {
    position: "relative"
  },

  video: {
    width: "100%",
    borderRadius: "14px",
    objectFit: "cover",
    maxHeight: "420px",
    background: "#000"
  },

  liveBadge: {

    position: "absolute",

    top: "12px",
    right: "12px",

    background: "#ef4444",
    color: "white",

    padding: "6px 10px",

    borderRadius: "999px",

    fontSize: "12px",
    fontWeight: "700",

    boxShadow:
      "0 4px 12px rgba(0,0,0,0.25)"
  },

  offBox: (dark) => ({
    background: dark ? "#0f172a" : "#f8fafc",
    border: dark
      ? "1px solid #1e293b"
      : "1px solid #e2e8f0",

    borderRadius: "14px",

    padding: "50px 20px",

    display: "flex",

    justifyContent: "center",
    alignItems: "center"
  }),

  text: (dark) => ({
    color: dark ? "#9ca3af" : "#64748b",
    fontSize: "15px",
    fontWeight: "500"
  })
};