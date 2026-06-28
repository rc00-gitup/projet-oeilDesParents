import React from "react";
import "./ScoreDanger.css";
export default function ScoreDanger({ data }) {
  const score = data?.score_danger ?? 0;
  const state = data?.etat_systeme ?? "STABLE";

  const getConfig = () => {
    if (score <= 30) {
      return {
        color: "#16a34a",
        label: "SITUATION SÛRE",
        sub: "Risque faible"
      };
    }

    if (score <= 70) {
      return {
        color: "#f59e0b",
        label: "SITUATION MODÉRÉE",
        sub: "Surveillance recommandée"
      };
    }

    return {
      color: "#ef4444",
      label: "SITUATION CRITIQUE",
      sub: "Intervention requise"
    };
  };

  const config = getConfig();

  return (
    <div className="score-card">

      {/* TITLE */}
      <div className="score-title">
        📊 Score Danger
      </div>

      {/* MAIN */}
      <div className="score-main">

        <div className="score-circle">

          <div className="circle-bg" />

          <div
            className="circle-progress"
            style={{
              background: `conic-gradient(${config.color} ${score * 3.6}deg, #e5e7eb 0deg)`
            }}
          />

          <div className="score-value">
            {score}%
          </div>

        </div>

        <div className="score-text">

          <div className="score-state" style={{ color: config.color }}>
            {config.label}
          </div>

          <div className="score-sub">
            {config.sub}
          </div>

        </div>

      </div>

      {/* BAR */}
      <div className="score-bar">
        <div
          className="score-fill"
          style={{
            width: `${score}%`,
            background: config.color
          }}
        />
      </div>

    </div>
  );
}