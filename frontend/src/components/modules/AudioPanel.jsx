import React from "react";
import "./AudioPanel.css";

export default function AudioPanel({ audio }) {
  const data = audio || {};

  const label = data.label || "silence";
  const energy = data.energy ?? 0;
  const confidence = data.confidence ?? 0;

  const getStateIcon = () => {
    switch (label) {
      case "cry":
        return "😢";
      case "noise":
        return "📢";
      default:
        return "🔇";
    }
  };

  const getStateText = () => {
    switch (label) {
      case "cry":
        return "Cri détecté";
      case "noise":
        return "Bruit détecté";
      default:
        return "Silence";
    }
  };

  const getLevel = () => {
    if (energy < 30) return "Faible";
    if (energy < 120) return "Moyen";
    return "Élevé";
  };

  const getBar = () => {
    const max = 300;
    return Math.min((energy / max) * 100, 100);
  };

  return (
    <div className="audio-card">

      {/* TITRE */}
      <div className="audio-header">
        🎧 AUDIO
      </div>

      {/* ETAT AUDIO */}
      <div
        className={`audio-state ${
          label === "silence"
            ? "state-silence"
            : label === "cry"
            ? "state-cry"
            : "state-noise"
        }`}
      >
        {getStateIcon()} {getStateText()}
      </div>

      {/* INFOS + ICONE */}
      <div className="audio-main-row">

        <div className="audio-info">

          <div className="audio-level-text">
            Niveau sonore :

            <span
              className={`audio-level-value ${
                getLevel() === "Faible"
                  ? "level-low"
                  : getLevel() === "Moyen"
                  ? "level-medium"
                  : "level-high"
              }`}
            >
              {getLevel()}
            </span>
          </div>

          <div className="audio-sub">
            Énergie : {energy.toFixed(1)}
          </div>

        </div>

        <div className="audio-big-icon">
          📶
        </div>

      </div>

      {/* BARRE */}
      <div className="audio-bar">
        <div
          className={`audio-fill ${
            label === "silence"
              ? "silence"
              : label === "cry"
              ? "cry"
              : "noise"
          }`}
          style={{
            width: `${getBar()}%`
          }}
        />
      </div>

      {/* TEXTE BAS */}
      <div className="audio-silence-row">
        {label === "silence"
          ? "🔇 Aucun son significatif détecté"
          : "🔊 Activité sonore détectée"}
      </div>

      {/* CONFIANCE */}
      <div className="audio-confidence-box">
        Confiance IA :
        <span>{confidence.toFixed(1)}%</span>
      </div>

    </div>
  );
}