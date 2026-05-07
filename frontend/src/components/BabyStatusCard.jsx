export default function BabyStatusCard({ data, darkMode }) {

  const safeData = data || {};
  const d = safeData.data || {}; // 👈 IMPORTANT

  const color =
    safeData.etat === "alerte"
      ? "#ef4444"
      : safeData.etat === "vigilance"
      ? "#f59e0b"
      : "#3b82f6";

  const emoji =
    safeData.etat === "alerte"
      ? "🚨"
      : safeData.etat === "vigilance"
      ? "⚠️"
      : "😴";

  const activityEmoji = {
    dort: "😴",
    réveillé: "👀",
    pleure: "😭"
  };

  const isAlert = safeData.etat === "alerte";

  const textColor = darkMode ? "#e5e7eb" : "#111827";
  const mutedColor = darkMode ? "#9ca3af" : "#6b7280";

  return (
    <div style={{ textAlign: "center" }}>

      <h2 style={{ color: color, fontWeight: "600" }}>
        {emoji} Bébé en surveillance
      </h2>

      <div style={{
        background: darkMode ? "#1f2937" : `${color}10`,
        border: `2px solid ${color}`,
        borderRadius: "16px",
        padding: "20px",
        color: textColor,
        transform: isAlert ? "scale(1.02)" : "scale(1)",
        transition: "0.3s",
        boxShadow: isAlert
          ? "0 0 20px rgba(239,68,68,0.4)"
          : darkMode
          ? "0 8px 20px rgba(0,0,0,0.35)"
          : "0 6px 15px rgba(0,0,0,0.05)"
      }}>

        <h1 style={{ color: color }}>
          {(safeData.etat || "normal").toUpperCase()}
        </h1>

        <p>
          👶 Activité : {activityEmoji[safeData.activite] || "❓"}{" "}
          <b>{safeData.activite || "inconnue"}</b>
        </p>

        <p>
          🛏️ Mouvement : {d.mouvement ? "Détecté" : "Aucun"}
        </p>

        <p>
          🔊 Son : {d.son ?? 0}/100
        </p>

        <p>
          🌡️ Température : {d.temperature ?? 0}°C
        </p>

        <p style={{ marginTop: "10px", fontSize: "12px", color: mutedColor }}>
          ⏱️ {safeData.timestamp || "--:--"}
        </p>

      </div>
    </div>
  );
}