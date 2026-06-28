import React from "react";
import useSocket from "../hooks/useSocket";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";

import BabyStatus from "../components/modules/BabyStatus";
import PredictionIA from "../components/modules/PredictionIA";
import ScoreDanger from "../components/modules/ScoreDanger";
import Alerts from "../components/modules/Alerts";
import SystemHealthPanel from "../components/modules/SystemHealthPanel";
import AudioPanel from "../components/modules/AudioPanel";
import GrapheScore from "../components/modules/GrapheScore";
import CameraView from "../components/modules/CameraView";

import "../styles/dashboard.css";

export default function Dashboard() {

  // 🔥 données temps réel provenant du websocket
  const data = useSocket() || {};

  // DEBUG
  console.log("📡 DATA IA :", data);
  console.log("🚨 ALERTES :", data?.alertes);

  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        <TopBar
          systemState={data?.etat_systeme}
          alerts={data?.alertes}
        />

        <div className="content">

          <div className="dashboard-layout">

            {/* ================= ROW 1 ================= */}

            <div className="baby-card">
              <BabyStatus data={data} />
            </div>

            <div className="camera-card">
              <CameraView camera={data?.data?.camera}/>
            </div>

            {/* ================= ROW 2 ================= */}

            <div className="stats-row">

              <div className="mini-card">
                <ScoreDanger data={data} />
              </div>

              <div className="mini-card">
                <PredictionIA data={data} />
              </div>

              <div className="mini-card">
                <AudioPanel
                  audio={data?.data?.audio}
                />
              </div>

              <div className="mini-card">
                <SystemHealthPanel data={data} />
              </div>

            </div>

            {/* ================= ROW 3 ================= */}

            <div className="bottom-row">

              <div className="mini-card">
                <Alerts
                  alerts={data?.alertes || []}
                />
              </div>

              <div className="mini-card">
                <GrapheScore data={data} />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}