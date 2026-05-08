export default function AlertBox({ data, darkMode }) {

  if (!data) return null;

  const etat = data.etat || "normal";
  const alerts = data.alerte || [];

  const config = {
    alerte: {
      color: "#ef4444",
      icon: "🚨",
      title: "Situation critique"
    },
    vigilance: {
      color: "#f59e0b",
      icon: "⚠️",
      title: "Attention requise"
    },
    normal: {
      color: "#22c55e",
      icon: "✅",
      title: "Tout est stable"
    }
  };

  const current = config[etat] || config.normal;

  return (
    <div style={styles.box(darkMode, current.color)}>

      <h3 style={styles.title(darkMode)}>
        {current.icon} {current.title}
      </h3>

      {/* 🔥 messages dynamiques backend */}
      {alerts.length > 0 ? (
        <div style={{ marginBottom: "12px" }}>
          {alerts.map((a, i) => (
            <div key={i} style={styles.alertItem(darkMode, current.color)}>
              {a.message}
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.text(darkMode)}>
          Aucun événement détecté pour le moment.
        </div>
      )}

      {/* 🧠 résumé intelligent */}
      <div style={styles.summary(darkMode)}>
        {etat === "alerte" && "Le système détecte une anomalie nécessitant une intervention."}
        {etat === "vigilance" && "Des variations inhabituelles ont été détectées."}
        {etat === "normal" && "Les paramètres du bébé sont stables et normaux."}
      </div>

    </div>
  );
}

const styles = {
  box: (dark, color) => ({
    background: dark ? "#1f2937" : "#ffffff",
    border: `1px solid ${color}`,
    borderRadius: "14px",
    padding: "16px",
    boxShadow: dark
      ? "0 10px 25px rgba(0,0,0,0.35)"
      : "0 6px 18px rgba(0,0,0,0.06)",
    color: dark ? "#e5e7eb" : "#111827",
    transition: "0.3s ease"
  }),

  title: (dark) => ({
    marginBottom: "12px",
    fontWeight: "700",
    fontSize: "16px",
    color: dark ? "#f9fafb" : "#0f172a"
  }),

  alertItem: (dark, color) => ({
    padding: "8px 10px",
    marginBottom: "8px",
    borderRadius: "8px",
    background: dark ? "#111827" : `${color}10`,
    borderLeft: `3px solid ${color}`,
    fontSize: "13px",
    color: dark ? "#d1d5db" : "#374151"
  }),

  text: (dark) => ({
    fontSize: "14px",
    opacity: 0.8
  }),

  summary: (dark) => ({
    marginTop: "10px",
    fontSize: "13px",
    opacity: 0.85,
    lineHeight: "1.4"
  })
};