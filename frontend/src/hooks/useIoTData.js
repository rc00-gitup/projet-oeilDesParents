import { useState, useEffect } from "react";

export function useIoTData() {
  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchData = () => {
      fetch("http://127.0.0.1:5000/data")
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP error " + res.status);
          }
          return res.json();
        })
        .then((json) => {
          console.log("DATA BACKEND 👉", json);
          setData(json);
        })
        .catch((err) => console.error("Erreur API:", err));
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);

  }, []);

  return data;
}