import React, { useEffect, useState } from "react";
import "./CameraView.css";

export default function CameraView({ camera = {} }) {

  const [status, setStatus] = useState("LIVE");

  useEffect(() => {

    const interval = setInterval(() => {

      fetch(
        "http://172.20.10.2:8080/video_feed",
        { method: "HEAD" }
      )
        .then(() => setStatus("LIVE"))
        .catch(() => setStatus("OFFLINE"));

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="camera-view">

      {/* HEADER */}

      <div className="camera-header">

        <div className="camera-title">
          📹 Flux Caméra
        </div>

        <div className="camera-live">

          <span
            className={`live-dot ${
              status === "LIVE"
                ? "online"
                : "offline"
            }`}
          />

          {status}

        </div>

      </div>

      {/* BODY */}

      <div className="camera-body">

        {/* VIDEO */}

        <div className="camera-video">

          <img
            src="http://172.20.10.2:8080/video_feed"
            alt="Camera Live"
            className="camera-stream"
          />

        </div>

        {/* INFORMATIONS */}

        <div className="camera-data">

          {/* PRESENCE */}

          <div className="camera-item">

            <div className="camera-icon">
              👤
            </div>

            <div>

              <div className="camera-label">
                Présence
              </div>

              <div className="camera-value presence-value">

                {camera.presence
                  ? "Détectée"
                  : "Absente"}

              </div>

            </div>

          </div>

          {/* MOUVEMENT */}

          <div className="camera-item">

            <div className="camera-icon">
              🏃
            </div>

            <div>

              <div className="camera-label">
                Mouvement
              </div>

              <div className="camera-value movement-value">

                {camera.mouvement
                  ? "Actif"
                  : "Calme"}

              </div>

            </div>

          </div>

          {/* YEUX */}

          <div className="camera-item">

            <div className="camera-icon">
              👁
            </div>

            <div>

              <div className="camera-label">
                Yeux
              </div>

              <div className="camera-value eyes-value">

                {camera.eyes_open
                  ? "Ouverts"
                  : "Fermés"}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}