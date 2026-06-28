import React from "react";
import "./BabyStatus.css";

export default function BabyStatus({ data }) {
  if (!data) return null;

  const activity = data?.activite;
  const confidence = data?.confidence_audio ?? 0;
  const state = data?.etat_systeme;
  const score = data?.score_danger ?? 0;

  const camera = data?.data?.camera || {};
  const alerts = data?.alertes || [];

  // =========================
  // ETAT SYSTEME
  // =========================

  const config =
    state === "ALERTE"
      ? {
          color: "red",
          badge: "🔴 ALERTE",
        }
      : state === "VIGILANCE"
      ? {
          color: "orange",
          badge: "🟠 VIGILANCE",
        }
      : {
          color: "green",
          badge: "🟢 STABLE",
        };

  // =========================
  // ACTIVITE
  // =========================

  const getEmoji = () => {
    if (activity === "crying") return "😭";

    if (activity === "sleeping") return "😴";

    if (activity === "awake") return "👶";

    if (activity === "absent") return "❌";

    return "👶";
  };

  const getLabel = () => {
    if (activity === "crying") return "Bébé pleure";

    if (activity === "sleeping") return "Bébé dort";

    if (activity === "awake") return "Bébé éveillé";

    if (activity === "absent") return "Bébé absent";

    return "Bébé éveillé";
  };

  // =========================
  // ALERTES HUMANISÉES
  // =========================

  const translateAlert = (alert) => {
    switch (alert) {
      case "baby_cry":
        return "Pleurs détectés";

      case "movement":
        return "Mouvement détecté";

      case "baby_absent":
        return "Bébé hors champ";

      case "noise_detected":
        return "Bruit détecté";

      default:
        return alert;
    }
  };

  return (
    <div className={`baby-card ${config.color}`}>

      {/* HEADER */}

      <div className="baby-header">

        <div>
          👶 État du bébé
        </div>

        <div className="system-badge">
          {config.badge}
        </div>

      </div>

      {/* BODY */}

      <div className="baby-body">

        {/* LEFT */}

        <div className="baby-main">

          <div className="baby-emoji">
            {getEmoji()}
          </div>

          <div className="baby-big-text">
            {getLabel()}
          </div>

          <div className="baby-score">
            Score danger : <b>{score}%</b>
          </div>

        </div>

        {/* RIGHT */}

        <div className="baby-info">

          <div>
            👤 Présence :
            <strong>
              {" "}
              {camera.presence ? "Détectée" : "Non détectée"}
            </strong>
          </div>

          <div>
            📡 Mouvement :
            <strong>
              {" "}
              {camera.mouvement ? "Actif" : "Aucun"}
            </strong>
          </div>

          <div>
            👁 Yeux :
            <strong>
              {" "}
              {camera.eyes_open ? "Ouverts" : "Fermés"}
            </strong>
          </div>

          <div>
            🎧 Audio :
            <strong>
              {" "}
              {confidence.toFixed(0)}%
            </strong>
          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div className="baby-footer">

        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <span key={index}>
              {index > 0 ? " • " : ""}
              {translateAlert(alert)}
            </span>
          ))
        ) : (
          <span>
            🟢 Aucun comportement anormal détecté
          </span>
        )}

      </div>

    </div>
  );
}