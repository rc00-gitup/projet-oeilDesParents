import React from "react";
import "./PredictionIA.css";

export default function PredictionIA({ data }) {
  const prediction = data?.prediction ?? "stable";
  const activity = data?.activite ?? "unknown";
  const confidence = data?.confidence_audio ?? 0;

  const getPredictionLabel = () => {
    switch (prediction) {
      case "baby_may_wake_up":
        return "Bébé risque de se réveiller";
      case "baby_restless":
        return "Sommeil agité détecté";
      case "deep_sleep":
        return "Sommeil profond";
      default:
        return "État stable";
    }
  };

  const getBehavior = () => {
    switch (activity) {
      case "active":
        return "Actif";
      case "crying":
        return "En pleurs";
      case "sleeping":
        return "En sommeil";
      case "absent":
        return "Absent";
      case "awake":
        return "Éveillé";
      default:
        return "Inconnu";
    }
  };

  const isWarning =
    prediction === "baby_may_wake_up" || prediction === "baby_restless";

  return (
    <div className="prediction-card">

      {/* HEADER */}
      <div className="prediction-header">
        🧠 Prediction IA
      </div>

      {/* MAIN */}
      <div className="prediction-main">

        {/* TEXT */}
        <div className="prediction-text">

          <div className="prediction-big accent">
              {getPredictionLabel()}
          </div>

          <div className="prediction-behavior">
            Comportement prédit : <strong>{getBehavior()}</strong>
          </div>

          {/* CONFIDENCE BADGE */}
          <div className="prediction-confidence-box">
            Confiance : <span>{confidence}%</span>
          </div>

        </div>

        {/* ICON */}
        <div className={`prediction-visual ${isWarning ? "warning" : ""}`}>
          {isWarning ? "⚠️" : "💤"}
        </div>

      </div>

    </div>
  );
}