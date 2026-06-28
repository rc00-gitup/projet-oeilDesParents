import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";

const NAV = [
  {
    icon: "🏠",
    label: "Tableau de bord",
    path: "/",
  },
  {
    icon: "👶",
    label: "État du bébé",
    path: "/baby",
  },
  {
    icon: "📷",
    label: "Caméra",
    path: "/camera",
  },
  {
    icon: "📡",
    label: "Capteurs",
    path: "/sensors",
  },
  {
    icon: "🔔",
    label: "Alertes",
    path: "/alerts",
  },
  {
    icon: "📊",
    label: "Historique",
    path: "/history",
  },
  {
    icon: "💬",
    label: "Notifications",
    path: "/notifications",
    badge: 3,
  },
  {
    icon: "⚙️",
    label: "Paramètres",
    path: "/settings",
  },
];

export default function Sidebar({
  connected = true,
}) {
  return (
    <aside className="sidebar">

      {/* LOGO */}

      <div className="sidebar-logo">

        <div className="logo-eye">
          👁
        </div>

        <div className="logo-content">
          <div className="logo-title">
            Œil des Parents
          </div>

          <div className="logo-sub">
            Surveillance intelligente
          </div>
        </div>

      </div>

      {/* MENU */}

      <nav className="sidebar-nav">

        {NAV.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >

            <span className="icon">
              {item.icon}
            </span>

            <span className="label">
              {item.label}
            </span>

            {item.badge && (
              <span className="badge">
                {item.badge}
              </span>
            )}

          </NavLink>

        ))}

      </nav>

      {/* SYSTEM STATUS */}

      <div className="sidebar-system">

        <div className="system-title">
          SYSTÈME
        </div>

        <div className="system-status">

          <span
            className={`dot ${
              connected ? "online" : "offline"
            }`}
          />

          <span
            className={`status-text ${
              connected ? "online" : "offline"
            }`}
          >
            {connected
              ? "EN LIGNE"
              : "HORS LIGNE"}
          </span>

        </div>

        <div className="system-sub">
          {connected
            ? "Flux temps réel actif"
            : "Connexion perdue"}
        </div>

      </div>

      {/* FOOTER */}

      <div className="sidebar-footer">
        Smart Baby Monitor v1.0
      </div>

    </aside>
  );
}