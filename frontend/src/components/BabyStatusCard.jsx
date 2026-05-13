export default function BabyStatusCard({ data, darkMode }) {

  const safeData = data || {};
  const d = safeData.data || {};

  const liveActivity =
    safeData.son > 75
      ? "pleure"
      : safeData.mouvement === 1
      ? "réveillé"
      : "dort";

  const config = {
    pleure: {
      color: "#ef4444",
      glow: "0 0 25px rgba(239,68,68,0.7)",
      emoji: "😭"
    },
    réveillé: {
      color: "#f59e0b",
      glow: "0 0 20px rgba(245,158,11,0.5)",
      emoji: "👀"
    },
    dort: {
      color: "#3b82f6",
      glow: "0 0 15px rgba(59,130,246,0.3)",
      emoji: "😴"
    }
  };

  const current = config[liveActivity];

  return (
    <div style={{ textAlign: "center" }}>

      <h2 style={{ color: current.color, fontWeight: "600" }}>
        {current.emoji} Bébé en surveillance
      </h2>

      <div style={{
        background: darkMode ? "#1f2937" : `${current.color}10`,
        border: `2px solid ${current.color}`,
        borderRadius: "16px",
        padding: "20px",
        color: darkMode ? "#e5e7eb" : "#111827",
        boxShadow: current.glow,
        transition: "0.3s",
        animation: liveActivity === "pleure" ? "pulse 1s infinite" : "none"
      }}>

        <h1 style={{ color: current.color }}>
          {liveActivity.toUpperCase()}
        </h1>

        <p>👶 Activité : <b>{liveActivity}</b></p>

        <p>🛏️ Mouvement : {safeData.mouvement ? "Détecté" : "Aucun"}</p>

        <p>🔊 Son : {safeData.son ?? 0}/100</p>

        <p>🌡️ Température : {safeData.temperature ?? 0}°C</p>

        <p style={{ fontSize: "12px", opacity: 0.7 }}>
          ⏱️ {safeData.timestamp || "--:--"}
        </p>

      </div>
    </div>
  );
}