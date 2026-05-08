export default function SensorPanel({ data, darkMode }) {

  const safeData = data || {};

  // 🔥 activité dynamique (cohérente avec BabyStatusCard)
  const liveActivity =
    safeData.son > 75
      ? "pleure"
      : safeData.mouvement === 1
      ? "réveillé"
      : "dort";

  const activityEmoji = {
    pleure: "😭",
    réveillé: "👀",
    dort: "😴"
  };

  return (
    <div style={styles.box(darkMode)}>

      <h3 style={styles.title(darkMode)}>📡 Capteurs IoT</h3>

      <div style={styles.row}>
        <span style={styles.label(darkMode)}>👶 Activité</span>
        <span style={styles.value(darkMode)}>
          {activityEmoji[liveActivity]} {liveActivity}
        </span>
      </div>

      <div style={styles.row}>
        <span style={styles.label(darkMode)}>🛏️ Mouvement</span>
        <span style={styles.value(darkMode)}>
          {safeData.mouvement ? "Détecté" : "Aucun"}
        </span>
      </div>

      <div style={styles.row}>
        <span style={styles.label(darkMode)}>🔊 Son</span>
        <span style={styles.value(darkMode)}>
          {safeData.son ?? 0}
        </span>
      </div>

      <div style={styles.row}>
        <span style={styles.label(darkMode)}>🌡️ Température</span>
        <span style={styles.value(darkMode)}>
          {safeData.temperature ?? 0}°C
        </span>
      </div>

    </div>
  );
}

// 🎨 STYLES (OBLIGATOIRE)
const styles = {
  box: (dark) => ({
    background: dark ? "#1f2937" : "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    color: dark ? "#e5e7eb" : "#111827",
    border: dark ? "1px solid #374151" : "1px solid #e2e8f0"
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