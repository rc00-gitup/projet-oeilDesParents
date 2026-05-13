export default function SensorPanel({ data, darkMode }) {

  const safeData = data || {};

  const son = safeData.son ?? 0;
  const mouvement = safeData.mouvement ?? 0;

  // 🔥 activité cohérente (même logique partout)
  let liveActivity = "dort";

  if (son > 75) {
    liveActivity = "pleure";
  } else if (mouvement === 1) {
    liveActivity = "réveillé";
  }

  const activityEmoji = {
    pleure: "😭",
    réveillé: "👀",
    dort: "😴"
  };

  const colorActivity = {
    pleure: "#ef4444",
    réveillé: "#f59e0b",
    dort: "#3b82f6"
  };

  const textColor = darkMode ? "#e5e7eb" : "#111827";

  return (
    <div style={{
      ...styles.box(darkMode),
      border: `2px solid ${colorActivity[liveActivity]}`,
      boxShadow: `0 0 18px ${colorActivity[liveActivity]}33`
    }}>

      <h3 style={styles.title(darkMode)}>
        📡 Capteurs IoT
      </h3>

      {/* 👶 ACTIVITÉ */}
      <div style={styles.row}>
        <span style={styles.label(darkMode)}>👶 Activité</span>
        <span style={{
          ...styles.value(darkMode),
          color: colorActivity[liveActivity],
          fontSize: "16px"
        }}>
          {activityEmoji[liveActivity]} {liveActivity}
        </span>
      </div>

      {/* 🛏️ MOUVEMENT */}
      <div style={styles.row}>
        <span style={styles.label(darkMode)}>🛏️ Mouvement</span>
        <span style={styles.value(darkMode)}>
          {mouvement ? "Détecté" : "Aucun"}
        </span>
      </div>

      {/* 🔊 SON */}
      <div style={styles.row}>
        <span style={styles.label(darkMode)}>🔊 Son</span>
        <span style={styles.value(darkMode)}>
          {son}/100
        </span>
      </div>

      {/* 🌡️ TEMP */}
      <div style={styles.row}>
        <span style={styles.label(darkMode)}>🌡️ Température</span>
        <span style={styles.value(darkMode)}>
          {safeData.temperature ?? 0}°C
        </span>
      </div>

    </div>
  );
}

const styles = {
  box: (dark) => ({
    background: dark ? "#1f2937" : "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    color: dark ? "#e5e7eb" : "#111827",
    border: dark ? "1px solid #374151" : "1px solid #e2e8f0",
    transition: "0.3s ease"
  }),

  title: (dark) => ({
    marginBottom: "14px",
    fontWeight: "600",
    color: dark ? "#f9fafb" : "#0f172a"
  }),

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },

  label: (dark) => ({
    color: dark ? "#9ca3af" : "#6b7280"
  }),

  value: (dark) => ({
    fontWeight: "600",
    color: dark ? "#f9fafb" : "#111827"
  })
};