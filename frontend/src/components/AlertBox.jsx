export default function AlertBox({ data, darkMode }) {

  const isAlert = data.etat === "alerte";
  const isWarning = data.etat === "vigilance";

  const color = isAlert
    ? "#ef4444"
    : isWarning
    ? "#f59e0b"
    : "#22c55e";

  return (
    <div style={styles.box(darkMode, color)}>

      <h3 style={styles.title(darkMode)}>
        🚨 Alertes système
      </h3>

      {isAlert ? (
        <p style={styles.text(darkMode)}>
          ⚠️ ALERTE : Situation critique détectée !
        </p>
      ) : isWarning ? (
        <p style={styles.text(darkMode)}>
          ⚠️ Vigilance : activité inhabituelle
        </p>
      ) : (
        <p style={styles.text(darkMode)}>
          ✅ Aucun problème détecté
        </p>
      )}

    </div>
  );
}

const styles = {
  box: (dark, color) => ({
    background: dark ? "#1f2937" : "#ffffff",
    border: `1px solid ${color}`,
    borderRadius: "12px",
    padding: "16px",
    boxShadow: dark
      ? "0 8px 20px rgba(0,0,0,0.35)"
      : "0 6px 15px rgba(0,0,0,0.05)",
    color: dark ? "#e5e7eb" : "#111827"
  }),

  title: (dark) => ({
    marginBottom: "10px",
    fontWeight: "600",
    color: dark ? "#f9fafb" : "#0f172a"
  }),

  text: (dark) => ({
    color: dark ? "#d1d5db" : "#374151",
    fontSize: "14px"
  })
};