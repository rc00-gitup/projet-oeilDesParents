import Navbar from "../components/Navbar";
import BabyStatusCard from "../components/BabyStatusCard";
import SensorPanel from "../components/SensorPanel";
import AlertBox from "../components/AlertBox";
import ChartPanel from "../components/ChartPanel";
import CameraFeed from "../components/CameraFeed";
import { useIoTData } from "../hooks/useIoTData";
import { useState, useEffect } from "react";

export default function Dashboard() {

  const data = useIoTData();

  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const styles = getStyles(darkMode);

  // 📊 historique
  useEffect(() => {
    if (!data) return;

    setHistory((prev) => [
      ...prev.slice(-10),
      {
        time: new Date().toLocaleTimeString(),
        son: data.son,
        temperature: data.temperature
      }
    ]);
  }, [data]);

  if (!data) return <p>Chargement...</p>;

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cameraActive={cameraActive}
        setCameraActive={setCameraActive}
      />

      <div style={styles.grid}>

        {/* LEFT SIDE */}
        <div style={styles.left}>

          {/* 👶 SURVEILLANCE BÉBÉ */}
          <div style={styles.card}>
            <h2 style={styles.h2}>👶 Surveillance bébé</h2>
            <BabyStatusCard data={data} darkMode={darkMode} />
          </div>

          {/* 📊 HISTORIQUE */}
          <div style={styles.card}>
            <h2 style={styles.h2}>📊 Historique</h2>
            <ChartPanel history={history} />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right} className="dashboard-right">

          {/* 🌡️ CAPTEURS */}
          <div style={styles.card}>
            <h2 style={styles.h2}>🌡️ Capteurs</h2>
            <SensorPanel data={data} darkMode={darkMode} />
          </div>

          {/* 🚨 ALERTES */}
          <div style={styles.card}>
            <h2 style={styles.h2}>🚨 Alertes</h2>
            <AlertBox data={data} darkMode={darkMode} />
          </div>

          {/* 📷 CAMÉRA */}
          <div style={styles.card}>
            <h2 style={styles.h2}>
              📷 Caméra {cameraActive ? "🟢 LIVE" : "⚫ OFF"}
            </h2>

            <CameraFeed
              cameraActive={cameraActive}
              darkMode={darkMode}
            />
          </div>

        </div>

      </div>
    </div>
  );
}

const getStyles = (dark) => ({
  page: {
    background: dark ? "#0f172a" : "#f1f5f9",
    color: dark ? "#f9fafb" : "#0f172a",
    minHeight: "100vh",
    padding: "80px 20px 40px",
    display: "flex",
    justifyContent: "center",
    transition: "0.3s"
  },

  grid: {
  display: "grid",
  gridTemplateColumns: "3fr 2fr",
  gap: "28px",
  width: "100%",
  maxWidth: "1300px",
  alignItems: "start"
  },

  left: {
  display: "flex",
  flexDirection: "column",
  gap: "20px"
  },

  right: {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  minWidth: "320px"
  },

  card: {
    background: dark ? "#1f2937" : "#ffffff",
    borderRadius: "18px",
    padding: "24px",
    border: dark ? "1px solid #374151" : "1px solid #e2e8f0",
    boxShadow: dark
      ? "0 8px 24px rgba(0,0,0,0.35)"
      : "0 10px 30px rgba(0,0,0,0.05)"
  },

  h2: {
    marginBottom: "12px",
    fontWeight: "600",
    color: dark ? "#f9fafb" : "#0f172a"
  }
});