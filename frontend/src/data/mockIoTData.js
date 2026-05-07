import { useEffect, useState } from "react";

export function useIoTData() {
  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchData = () => {
      fetch("http://127.0.0.1:5000/data")
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => console.error("API error:", err));
    };

    fetchData(); // premier appel

    const interval = setInterval(fetchData, 2000); // live

    return () => clearInterval(interval);

  }, []);

  return data;
}