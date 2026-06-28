import React from "react";
import { useEffect, useState } from "react";
import "../../styles/topbar.css";

export default function TopBar({ systemState, alerts }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("fr-FR");
  const formattedDate = time.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const state = systemState || "NORMAL";

  return (
    <div className="topbar">

      {/* TITLE */}
      <div className="topbar-title">
        <h1>Tableau de bord</h1>
        <p>Surveillance intelligente du bébé en temps réel</p>
      </div>

      <div className="spacer" />

      {/* TIME */}
      <div className="topbar-item time-box">
        <span className="clock">🕒</span>
        <div>
          <div className="time">{formattedTime}</div>
          <div className="date">{formattedDate}</div>
        </div>
      </div>

      {/* STATE */}
      <div className={`topbar-item state ${state}`}>
          <span className="label">État système</span>
          <span className="value">{state}</span>
      </div>

      {/* NOTIF */}
      <div className="topbar-item notif">
        🔔
        {alerts?.length > 0 && <span className="dot"></span>}
      </div>

    </div>
  );
}