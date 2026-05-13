export default function Navbar({
  darkMode,
  setDarkMode,
  cameraActive,
  setCameraActive,
  notifCount = 0,
  showNotifPanel,
  setShowNotifPanel
}) {

  const styles = getStyles(darkMode);

  return (

    <div style={styles.nav}>

      {/* LOGO */}
      <h2 style={styles.logo}>
        👁️ Oeil
        <span style={styles.highlight}>
          Des
        </span>
        Parents
      </h2>

      {/* ACTIONS */}
      <div style={styles.actions}>

        {/* 📷 CAMERA */}
        <button
          onClick={() =>
            setCameraActive(prev => !prev)
          }
          style={{
            ...styles.button,

            background: cameraActive
              ? "#22c55e"
              : darkMode
              ? "#334155"
              : "#e2e8f0",

            color: cameraActive || darkMode
              ? "#fff"
              : "#0f172a"
          }}
        >
          {cameraActive
            ? "📷 LIVE"
            : "📷 Caméra"}
        </button>

        {/* 🔔 NOTIFICATIONS */}
        <div
          style={styles.notif}
          onClick={() =>
            setShowNotifPanel(prev => !prev)
          }
        >
          🔔

          {notifCount > 0 && (
            <span style={styles.badge}>
              {notifCount > 99
                ? "99+"
                : notifCount}
            </span>
          )}
        </div>

        {/* 🌙 DARK MODE */}
        <button
          onClick={() =>
            setDarkMode(prev => !prev)
          }
          style={styles.button}
        >
          {darkMode
            ? "☀️ Light"
            : "🌙 Dark"}
        </button>

      </div>

    </div>
  );
}

const getStyles = (darkMode) => ({

  /* NAVBAR */
  nav: {

    position: "fixed",

    top: 0,
    left: 0,

    width: "100%",

    zIndex: 1000,

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    padding: "14px 28px",

    background: darkMode
      ? "rgba(15,23,42,0.88)"
      : "rgba(255,255,255,0.88)",

    backdropFilter: "blur(12px)",

    borderBottom: darkMode
      ? "1px solid #1e293b"
      : "1px solid #e2e8f0",

    boxShadow: darkMode
      ? "0 4px 20px rgba(0,0,0,0.35)"
      : "0 4px 20px rgba(0,0,0,0.06)"
  },

  /* LOGO */
  logo: {

    margin: 0,

    display: "flex",

    alignItems: "center",

    gap: "6px",

    fontSize: "20px",

    fontWeight: "700",

    color: darkMode
      ? "#fff"
      : "#0f172a"
  },

  highlight: {
    color: "#3b82f6"
  },

  /* ACTIONS */
  actions: {

    display: "flex",

    alignItems: "center",

    gap: "14px"
  },

  /* NOTIFICATION */
  notif: {

    position: "relative",

    padding: "8px 12px",

    borderRadius: "12px",

    cursor: "pointer",

    userSelect: "none",

    fontSize: "20px",

    transition: "0.25s ease",

    background: darkMode
      ? "#1e293b"
      : "#f1f5f9",

    color: darkMode
      ? "#fff"
      : "#0f172a"
  },

  /* BADGE */
  badge: {

    position: "absolute",

    top: "-5px",
    right: "-5px",

    minWidth: "18px",

    height: "18px",

    padding: "0 5px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    borderRadius: "999px",

    fontSize: "10px",

    fontWeight: "700",

    background: "#ef4444",

    color: "#fff",

    boxShadow:
      "0 2px 8px rgba(239,68,68,0.45)"
  },

  /* BUTTON */
  button: {

    border: "none",

    cursor: "pointer",

    padding: "8px 14px",

    borderRadius: "10px",

    fontSize: "14px",

    fontWeight: "600",

    transition: "0.25s ease"
  }
});