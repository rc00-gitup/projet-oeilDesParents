import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import BabyPage from "./pages/BabyPage";

import CameraPage from "./pages/CameraPage";
import SensorsPage from "./pages/SensorsPage";
import AlertsPage from "./pages/AlertsPage";
import HistoryPage from "./pages/HistoryPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";

import "./styles/theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/baby"
          element={<BabyPage />}
        />

        <Route
          path="/camera"
          element={<CameraPage />}
        />

        <Route
          path="/sensors"
          element={<SensorsPage />}
        />

        <Route
          path="/alerts"
          element={<AlertsPage />}
        />

        <Route
          path="/history"
          element={<HistoryPage />}
        />

        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;