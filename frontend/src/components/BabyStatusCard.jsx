export default function BabyStatusCard({ data, darkMode }) {

  const color =
    data.etat === "alerte"
      ? "#ef4444"
      : data.etat === "vigilance"
      ? "#f59e0b"
      : "#3b82f6";

  const emoji =
    data.etat === "alerte"
      ? "🚨"
      : data.etat === "vigilance"
      ? "⚠️"
      : "😴";

  const activityEmoji = {
    dort: "😴",
    réveillé: "👀",
    pleure: "😭"
  };

  const isAlert = data.etat === "alerte";

  // 🎯 TEXTES THEME SAFE
  const textColor = darkMode ? "#e5e7eb" : "#111827";
  const mutedColor = darkMode ? "#9ca3af" : "#6b7280";

  return (
    <div style={{ textAlign: "center" }}>

      <h2 style={{ color: color, fontWeight: "600" }}>
        {emoji} Bébé en surveillance
      </h2>

      <div
        style={{
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
        }}
      >

        <h1 style={{ color: color }}>
          {data.etat.toUpperCase()}
        </h1>

        <p style={{ color: textColor }}>
          👶 Activité : {activityEmoji[data.activite]} <b>{data.activite}</b>
        </p>

        <p style={{ color: textColor }}>
          🛏️ Mouvement : {data.mouvement ? "Détecté" : "Aucun"}
        </p>

        <p style={{ color: textColor }}>
          🔊 Son : {data.son}/100
        </p>

        <p style={{ color: textColor }}>
          🌡️ Température : {data.temperature}°C
        </p>

        <p style={{ marginTop: "10px", fontSize: "12px", color: mutedColor }}>
          ⏱️ {data.timestamp}
        </p>

      </div>
    </div>
  );
}