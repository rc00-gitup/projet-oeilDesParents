import { useEffect, useState } from "react";
import { getIoTData } from "../services/api";

export function useIoTData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newData = await getIoTData();

      // 🧠 ETAT
      let etat = "normal";

      if (newData.son > 70 || newData.mouvement === 1) {
        etat = "alerte";
      } else if (newData.son > 40) {
        etat = "vigilance";
      }

      // 👶 ACTIVITÉ
      let activite = "dort";

      if (newData.son > 70) {
        activite = "pleure";
      } else if (newData.mouvement === 1 || newData.son > 40) {
        activite = "réveillé";
      } else {
        activite = "dort";
      }

      setData({
        ...newData,
        etat,
        activite
      });

    }, 6000); // ⏱️ ralenti pour lecture

    return () => clearInterval(interval);
  }, []);

  return data;
}