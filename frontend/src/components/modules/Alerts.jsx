import React from "react";
import { useEffect, useState } from "react";
import "./Alerts.css";

export default function Alerts({ alerts = [] }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!alerts.length) return;

    const now = new Date();

    setHistory((prev) => {
      const updated = [...prev];

      alerts.forEach((alert) => {
        const last = updated[0];

        // évite les doublons consécutifs
        if (last?.type === alert) return;

        updated.unshift({
          id: Date.now() + Math.random(),
          type: alert,
          time: now,
        });
      });

      return updated.slice(0, 5);
    });
  }, [alerts]);

  const getConfig = (alert) => {
    switch (alert) {
      case "baby_absent":
        return {
          icon: "🚨",
          label: "Bébé absent détecté",
          color: "danger",
        };

      case "baby_cry":
        return {
          icon: "😢",
          label: "Bébé en train de pleurer",
          color: "warning",
        };

      case "noise_detected":
        return {
          icon: "📢",
          label: "Bruit anormal détecté",
          color: "warning",
        };

      case "system_vigilance":
        return {
          icon: "🔵",
          label: "Système en vigilance",
          color: "info",
        };

      case "system_safe":
        return {
          icon: "🟢",
          label: "Système stable",
          color: "success",
        };

      default:
        return {
          icon: "⚠️",
          label: alert,
          color: "info",
        };
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="alerts-card">

      <div className="alerts-header">
        🚨 Alertes récentes
      </div>

      <div className="alerts-subtitle">
        5 derniers événements détectés
      </div>

      <div className="alerts-list">

        {history.length === 0 ? (
          <div className="alerts-empty">
            Aucun événement détecté
          </div>
        ) : (
          history.map((alert) => {
            const cfg = getConfig(alert.type);

            return (
              <div
                key={alert.id}
                className={`alert-item ${cfg.color}`}
              >
                <span className="alert-icon">
                  {cfg.icon}
                </span>

                <div className="alert-content">

                  <div className="alert-text">
                    {cfg.label}
                  </div>

                  <div className="alert-time">
                    🕒 {formatTime(alert.time)}
                  </div>

                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}