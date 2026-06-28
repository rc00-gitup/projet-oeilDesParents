const BASE = import.meta.env.VITE_BACKEND_URL;

export const api = {
  status: () => fetch(`${BASE}/status`).then(r => r.json()),
  history: () => fetch(`${BASE}/history`).then(r => r.json()),
  alerts: () => fetch(`${BASE}/alerts`).then(r => r.json()),
};