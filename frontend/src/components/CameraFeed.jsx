import { useEffect, useRef } from "react";

export default function CameraFeed({ cameraActive, darkMode }) {

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {

    // 👉 ACTIVE CAMERA
    if (cameraActive) {
      startCamera();
    }

    // 👉 STOP CAMERA
    if (!cameraActive) {
      stopCamera();
    }

  }, [cameraActive]);

  const startCamera = async () => {

    // sécurité : éviter double stream
    if (streamRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }

    } catch (err) {
      console.error("Erreur caméra :", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  return (
    <div style={styles.box(darkMode)}>

      {cameraActive ? (
        <video ref={videoRef} autoPlay style={styles.video} />
      ) : (
        <p style={styles.text(darkMode)}>
          📷 Caméra désactivée (clique sur le bouton dans la navbar)
        </p>
      )}

    </div>
  );
}

const styles = {
  box: (dark) => ({
    background: dark ? "#1f2937" : "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    color: dark ? "#e5e7eb" : "#111827",
    border: dark ? "1px solid #374151" : "1px solid #e2e8f0"
  }),

  videoWrapper: (dark) => ({
    borderRadius: "12px",
    overflow: "hidden",
    border: dark ? "1px solid #374151" : "1px solid #e2e8f0",
    background: "#000"
  }),

  video: {
    width: "100%",
    display: "block"
  },

  text: (dark) => ({
    color: dark ? "#9ca3af" : "#6b7280",
    textAlign: "center"
  })
};