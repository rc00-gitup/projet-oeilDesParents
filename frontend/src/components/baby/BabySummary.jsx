import React from "react";

export default function BabySummary({ data }) {

  const score = data?.score_danger || 0;

  return (
    <>
      <h2>📋 Résumé instantané</h2>

      <div className="summary-box">

        <div className="summary-item">
          <div className="summary-label">
            🎯 Activité
          </div>

          <div className="summary-value">
            {data?.activite || "Inconnue"}
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-label">
            🤖 Prédiction IA
          </div>

          <div className="summary-value">
            {data?.prediction || "-"}
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-label">
            ⚠️ Danger
          </div>

          <div
            className="summary-score"
            style={{
              color:
                score >= 80
                  ? "#ef4444"
                  : score >= 50
                  ? "#f59e0b"
                  : "#22c55e"
            }}
          >
            {score}%
          </div>
        </div>

      </div>
    </>
  );
}