import { useState, useRef } from "react";

export function useNotification() {

  const [notifications, setNotifications] = useState([]);
  const [history, setHistory] = useState([]);

  const timersRef = useRef({});
  const lastIdRef = useRef(null);

  // =========================
  // 🔔 PUSH NOTIFICATION
  // =========================
  const pushNotification = (data) => {

    const id = data?.id || `${Date.now()}-${Math.random()}`;

    if (lastIdRef.current === id) return;
    lastIdRef.current = id;

    const notif = {
      id,
      message: data?.message || "🚨 Alerte détectée",
      time: data?.time || new Date().toLocaleTimeString(),
      read: false
    };

    setNotifications(prev => [notif, ...prev]);

    // auto remove fallback
    timersRef.current[id] = setTimeout(() => {
      removeNotification(id);
    }, 5000);

    setHistory(prev => [notif, ...prev.slice(0, 49)]);
  };

  // =========================
  // ❌ REMOVE ONE
  // =========================
  const removeNotification = (id) => {

    setNotifications(prev => prev.filter(n => n.id !== id));

    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  };

  // =========================
  // 🚨 SYNC ETAT (CLEAR IF NOT ALERT)
  // =========================
  const syncWithEtat = (etat) => {

    if (etat !== "alerte") {
      setNotifications([]);

      Object.values(timersRef.current).forEach(clearTimeout);
      timersRef.current = {};
    }
  };

  // =========================
  // 📭 MARK AS READ (HISTORY VIEW)
  // =========================
  const markAsRead = () => {
    setNotifications([]);
    setHistory(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    lastIdRef.current = null;
  };

  return {
    notifications,
    history,
    pushNotification,
    removeNotification,
    syncWithEtat,
    markAsRead
  };
}