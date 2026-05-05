import { useState } from "react";

export default function Navbar({
  darkMode,
  setDarkMode,
  cameraActive,
  setCameraActive
}) {
  const [notifCount] = useState(3);

  const styles = getStyles(darkMode);

  return (
    <div style={styles.nav}>

      {/* LOGO */}
      <h2 style={styles.logo}>
        👁️ Oeil<span style={styles.highlight}>Des</span>Parents
      </h2>

      {/* ACTIONS */}
      <div style={styles.actions}>

        {/* 📷 CAMÉRA TOGGLE */}
        <button
          onClick={() => setCameraActive(!cameraActive)}
          style={{
            ...styles.button,
            background: cameraActive
              ? "#22c55e"
              : darkMode
              ? "#334155"
              : "#e2e8f0",
            color: cameraActive ? "#fff" : darkMode ? "#fff" : "#0f172a"
          }}
        >
          {cameraActive ? "📷 LIVE" : "📷 Caméra"}
        </button>

        {/* 🔔 Notifications */}
        <div style={styles.notif}>
          🔔
          {notifCount > 0 && (
            <span style={styles.badge}>{notifCount}</span>
          )}
        </div>

        {/* 🌙 DARK MODE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={styles.button}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

      </div>
    </div>
  );
}

const getStyles = (darkMode) => ({
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,

    background: darkMode
      ? "rgba(30, 41, 59, 0.9)"
      : "rgba(255, 255, 255, 0.9)",

    backdropFilter: "blur(10px)",

    padding: "14px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    boxShadow: darkMode
      ? "0 2px 15px rgba(0,0,0,0.4)"
      : "0 2px 15px rgba(0,0,0,0.08)"
  },

  logo: {
    fontWeight: "700",
    fontSize: "20px",
    color: darkMode ? "#fff" : "#0f172a",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },

  highlight: {
    color: "#3b82f6"
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "14px"
  },

  notif: {
    position: "relative",
    fontSize: "20px",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "10px",
    background: darkMode ? "#1e293b" : "#f1f5f9",
    color: darkMode ? "#fff" : "#0f172a"
  },

  badge: {
    position: "absolute",
    top: "-4px",
    right: "-6px",
    background: "#ef4444",
    color: "white",
    borderRadius: "50%",
    fontSize: "11px",
    padding: "2px 6px",
    fontWeight: "bold"
  },

  button: {
    padding: "7px 12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
    fontWeight: "500"
  }
});