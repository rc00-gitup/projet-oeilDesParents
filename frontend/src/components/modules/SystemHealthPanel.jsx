import React from "react";
import "./SystemHealthPanel.css";

export default function SystemHealthPanel({ data }) {
  const cameraOk = data?.data?.camera !== undefined;
  const audioOk = data?.data?.audio !== undefined;
  const aiOk = data?.prediction !== undefined;
  const raspberryOk = cameraOk || audioOk;

  const total = [cameraOk, audioOk, aiOk, raspberryOk].filter(Boolean).length;

  const getSystemText = () => {
    if (total === 4) return "Tous fonctionnent";
    if (total >= 3) return "Système global stable";
    if (total >= 2) return "Certains modules fonctionnent pas";
    return "Système en état critique";
  };

  const getStatusClass = () => {
    if (total === 4) return "status-ok";
    if (total >= 3) return "status-warning";
    return "status-danger";
  };

  return (
    <div className="health-card">

      {/* HEADER */}
      <div className="health-header">
        🖥️ Santé du système
      </div>

      {/* STATUS LINE */}
      <div className={`health-subtitle ${getStatusClass()}`}>
        {getSystemText()}
      </div>

      {/* MODULES */}
      <div className="health-list">

        <div className="health-item">
          📷 Camera
          <span className={cameraOk ? "ok" : "off"}>
            {cameraOk ? "opérationnelle" : "non détectée"}
          </span>
        </div>

        <div className="health-item">
          🎧 Audio
          <span className={audioOk ? "ok" : "off"}>
            {audioOk ? "actif" : "inactif"}
          </span>
        </div>

        <div className="health-item">
          🧠 IA
          <span className={aiOk ? "ok" : "off"}>
            {aiOk ? "opérationnel" : "arrêté"}
          </span>
        </div>

        <div className="health-item">
          🍓 Raspberry
          <span className={raspberryOk ? "ok" : "off"}>
            {raspberryOk ? "connecté" : "hors ligne"}
          </span>
        </div>

      </div>

    </div>
  );
}