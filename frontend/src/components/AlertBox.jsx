console.log("ALERTBOX DATA 👉", data);
export default function AlertBox({ data, darkMode }) {

  if (!data) return null;

  const etat = data.etat || "normal";

  const isAlert = etat === "alerte";
  const isWarning = etat === "vigilance";

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

      {/* 🔥 ALERTES DYNAMIQUES BACKEND */}
      {data.alerte?.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          {data.alerte.map((a, i) => (
            <p key={i} style={styles.text(darkMode)}>
              {a.message}
            </p>
          ))}
        </div>
      )}

      {/* fallback UI */}
      {isAlert ? (
        <p style={styles.text(darkMode)}>
          ⚠️ ALERTE CRITIQUE 🚨
        </p>
      ) : isWarning ? (
        <p style={styles.text(darkMode)}>
          ⚠️ Vigilance détectée
        </p>
      ) : (
        <p style={styles.text(darkMode)}>
          ✅ Système normal
        </p>
      )}

    </div>
  );
}

// 🎨 CSS (styles intégrés)
const styles = {
  box: (dark, color) => ({
    background: dark ? "#1f2937" : "#ffffff",
    border: `1px solid ${color}`,
    borderRadius: "12px",
    padding: "16px",
    boxShadow: dark
      ? "0 8px 20px rgba(0,0,0,0.35)"
      : "0 6px 15px rgba(0,0,0,0.05)",
    color: dark ? "#e5e7eb" : "#111827",
    transition: "0.3s ease"
  }),

  title: (dark) => ({
    marginBottom: "10px",
    fontWeight: "600",
    color: dark ? "#f9fafb" : "#0f172a",
    fontSize: "16px"
  }),

  text: (dark) => ({
    color: dark ? "#d1d5db" : "#374151",
    fontSize: "14px",
    lineHeight: "1.4"
  })
};