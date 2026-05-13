import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export function useIoTData() {

  const [data, setData] = useState(null);
  const socketRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {

    console.log("🟢 HOOK STARTED");

    if (socketRef.current) return;

    const socket = io("http://127.0.0.1:5000", {
      transports: ["polling", "websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      timeout: 20000
    });

    socketRef.current = socket;

    // =========================
    // 🟢 CONNECT
    // =========================
    socket.on("connect", () => {
      console.log("🟢 SOCKET CONNECTED:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 DISCONNECTED:", reason);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ CONNECT ERROR:", err.message);
    });

    // =========================
    // 📡 IO DATA
    // =========================
    socket.on("iot_update", (res) => {

      console.log("📡 RAW PACKET:", res);

      // 🔒 anti doublon stable
      const key = `${res.timestamp}-${res.mouvement}-${res.son}`;

      if (lastRef.current === key) return;
      lastRef.current = key;

      // =========================
      // 🚨 IMPORTANT FIX ICI
      // =========================
      const normalized = {
        data: {
          son: res.son ?? 0,
          temperature: res.temperature ?? 0,
          mouvement: res.mouvement ?? 0
        },

        // 🔥 NE PAS PERDRE ETAT
        etat: res.etat ?? "normal",
        activite: res.activite ?? "calme",
        timestamp: res.timestamp ?? ""
      };

      console.log("📦 NORMALIZED:", normalized);

      setData(normalized);
    });

    // =========================
    // 🧹 CLEANUP
    // =========================
    return () => {

      console.log("🔴 SOCKET CLEANUP");

      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("iot_update");

      socket.disconnect();
      socketRef.current = null;
    };

  }, []);

  return { data };
}