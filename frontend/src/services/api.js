export const getIoTData = async () => {
  return {
    mouvement: Math.random() > 0.6 ? 1 : 0,
    son: Math.floor(Math.random() * 100),
    temperature: (36 + Math.random() * 2).toFixed(1),
    timestamp: new Date().toISOString()
  };
};