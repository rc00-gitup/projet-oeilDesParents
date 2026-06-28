import React from "react";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import useSocket from "../hooks/useSocket";

export default function NotificationsPage() {

  const data = useSocket() || {};

  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        <TopBar
          systemState={data?.etat_systeme}
          alerts={data?.alertes}
        />

        <div className="content">

          <div style={{ padding: "30px" }}>
            <h1>Notifications</h1>

            <p>Page en cours de développement</p>
          </div>

        </div>

      </div>

    </div>
  );
}