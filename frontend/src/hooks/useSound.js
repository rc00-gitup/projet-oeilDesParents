import { useRef } from "react";

export function useSound() {

  const audioRef = useRef(null);

  const playAlert = () => {

    try {

      // 🔥 éviter recréer audio à chaque fois
      if (!audioRef.current) {
        audioRef.current = new Audio("/alert.mp3");
        audioRef.current.volume = 1;
      }

      const audio = audioRef.current;

      // 🔥 reset pour rejouer même si déjà playing
      audio.currentTime = 0;

      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("🔇 Audio bloqué (user gesture required):", err);
        });
      }

    } catch (e) {
      console.log("🔇 Erreur audio :", e);
    }
  };

  return { playAlert };
}