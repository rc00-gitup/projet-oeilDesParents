import Navbar from "../components/Navbar";
import BabyStatusCard from "../components/BabyStatusCard";
import SensorPanel from "../components/SensorPanel";
import AlertBox from "../components/AlertBox";
import ChartPanel from "../components/ChartPanel";
import CameraFeed from "../components/CameraFeed";
import Notification from "../components/Notification";

import { useIoTData } from "../hooks/useIoTData";
import { useNotification } from "../hooks/useNotification";
import { useSound } from "../hooks/useSound";

import { useState, useEffect, useRef } from "react";

export default function Dashboard() {

  const { data } = useIoTData();
  const { playAlert } = useSound();

  const {
    notifications,
    pushNotification,
    syncWithEtat,
    markAsRead,
    history: notifHistory
  } = useNotification();

  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  const lastAlertRef = useRef(null);

  const styles = getStyles(darkMode);

  // =========================
  // 📊 HISTORY
  // =========================
  useEffect(() => {
    if (!data?.data) return;

    const d = data.data;

    setHistory(prev => [
      ...prev.slice(-29),
      {
        time: data.timestamp || new Date().toLocaleTimeString(),
        son: d.son ?? 0,
        temperature: d.temperature ?? 0,
        mouvement: d.mouvement ?? 0
      }
    ]);

  }, [data?.timestamp]);

  // =========================
  // 🚨 ALERT SYSTEM
  // =========================
  useEffect(() => {

    if (!data?.etat) return;

    syncWithEtat(data.etat);

    if (data.etat !== "alerte") return;

    const id = `${data.timestamp}-${data.etat}`;

    if (lastAlertRef.current === id) return;
    lastAlertRef.current = id;

    setNotifCount(prev => prev + 1);
    playAlert();

    pushNotification({
      id,
      message: "🚨 Alerte détectée",
      time: data.timestamp
    });

  }, [data?.timestamp, data?.etat]);

  // =========================
  // 📭 RESET ON OPEN
  // =========================
  useEffect(() => {
    if (showNotifPanel) {
      markAsRead();
      setNotifCount(0);
    }
  }, [showNotifPanel]);

  const sensor = {
    etat: data?.etat ?? "normal",
    activite: data?.activite ?? "calme",
    son: data?.data?.son ?? 0,
    mouvement: data?.data?.mouvement ?? 0,
    temperature: data?.data?.temperature ?? 0,
    timestamp: data?.timestamp ?? ""
  };

  return (
    <div style={styles.page}>

      <Notification notifications={notifications} />

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cameraActive={cameraActive}
        setCameraActive={setCameraActive}
        notifCount={notifCount}
        showNotifPanel={showNotifPanel}
        setShowNotifPanel={setShowNotifPanel}
      />

      {showNotifPanel && (
        <div style={styles.notifPanel}>
          <h3 style={styles.title}>🔔 Historique notifications</h3>

          {notifHistory.length === 0 ? (
            <p style={styles.subtitle}>Aucune notification</p>
          ) : (
            notifHistory.map(n => (
              <div key={n.id} style={styles.notifItem}>
                <p style={styles.notifMessage}>{n.message}</p>
                <small style={styles.notifTime}>{n.time}</small>
              </div>
            ))
          )}
        </div>
      )}

      <div style={styles.grid}>

        <div style={styles.left}>
          <div style={styles.card}>
            <h2 style={styles.title}>👶 Surveillance bébé</h2>
            <BabyStatusCard data={sensor} darkMode={darkMode} />
          </div>

          <div style={styles.card}>
            <h2 style={styles.title}>📊 Historique</h2>
            <ChartPanel history={history} />
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.card}>
            <h2 style={styles.title}>🌡️ Capteurs</h2>
            <SensorPanel data={sensor} darkMode={darkMode} />
          </div>

          <div style={styles.card}>
            <h2 style={styles.title}>🚨 Alertes</h2>
            <AlertBox data={sensor} darkMode={darkMode} />
          </div>

          <div style={styles.card}>
            <h2 style={styles.title}>
              📷 Caméra {cameraActive ? "🟢 LIVE" : "⚫ OFF"}
            </h2>

            <CameraFeed
              cameraActive={cameraActive}
              sensor={sensor}
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
    background: dark ? "#0b1220" : "#f1f5f9",
    minHeight: "100vh",
    padding: "80px 20px",
    display: "flex",
    justifyContent: "center",
    transition: "all 0.3s ease",
    fontFamily: "Inter, sans-serif"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr",
    gap: "24px",
    maxWidth: "1300px",
    width: "100%"
  },

  left: { display: "flex", flexDirection: "column", gap: "20px" },
  right: { display: "flex", flexDirection: "column", gap: "20px" },

  card: {
    background: dark
      ? "linear-gradient(145deg, #111827, #0f172a)"
      : "#fff",
    padding: "20px",
    borderRadius: "18px",
    border: dark ? "1px solid #1f2937" : "1px solid #e2e8f0",
    boxShadow: dark
      ? "0 10px 25px rgba(0,0,0,0.4)"
      : "0 8px 20px rgba(0,0,0,0.06)",
    transition: "all 0.25s ease"
  },

  title: {
    color: dark ? "#f9fafb" : "#111827",
    fontSize: "25px",
    fontWeight: "600",
    marginBottom: "12px"
  },

  subtitle: {
    color: dark ? "#9ca3af" : "#6b7280",
    fontSize: "13px"
  },

  notifPanel: {
    position: "fixed",
    top: "80px",
    right: "20px",
    width: "360px",
    maxHeight: "420px",
    overflowY: "auto",
    background: dark ? "#0b1220" : "#fff",
    color: dark ? "#f9fafb" : "#111827",
    borderRadius: "16px",
    padding: "14px",
    zIndex: 9999,
    border: dark ? "1px solid #1f2937" : "1px solid #e5e7eb"
  },

  notifItem: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "12px",
    background: dark ? "#111827" : "#f8fafc",
    border: dark ? "1px solid #1f2937" : "1px solid #e5e7eb"
  },

  notifMessage: {
    color: dark ? "#f9fafb" : "#111827",
    fontSize: "13px"
  },

  notifTime: {
    color: dark ? "#9ca3af" : "#6b7280",
    fontSize: "11px"
  }
});