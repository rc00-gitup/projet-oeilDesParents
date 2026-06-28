import React from "react";

export default function BabyBehavior({ data }) {

  const camera = data?.data?.camera || {};

  return (
    <>
      <h2>🧠 Analyse comportementale</h2>

      <div className="baby-grid-info">

        <div className="info-item">
          <span className="info-label">
            👤 Présence
          </span>

          <span className="info-value">
            {camera.presence ? "Détectée" : "Absente"}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">
            🏃 Mouvement
          </span>

          <span className="info-value">
            {camera.mouvement ? "Actif" : "Aucun"}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">
            👁️ Yeux
          </span>

          <span className="info-value">
            {camera.eyes_open ? "Ouverts" : "Fermés"}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">
            😴 Sommeil
          </span>

          <span className="info-value">
            {camera.sleep ? "Oui" : "Non"}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">
            📊 État
          </span>

          <span className="info-value">
            {camera.state}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">
            🎯 Motion Score
          </span>

          <span className="info-value">
            {camera.motion_score}
          </span>
        </div>

      </div>
    </>
  );
}