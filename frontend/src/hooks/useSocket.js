import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function useSocket() {

  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {

    const handleUpdate = (msg) => {

      console.log("📡 RAW SOCKET :", msg);

      setData(msg);

      setHistory((prev) => {
        const updated = [
          ...prev.slice(-9),
          {
            time: new Date().toLocaleTimeString(),
            score: msg.score_danger || 0
          }
        ];
        return updated;
      });

    };

    socket.on("iot_update", handleUpdate);

    return () => socket.off("iot_update", handleUpdate);

  }, []);

  return { ...data, history };
}