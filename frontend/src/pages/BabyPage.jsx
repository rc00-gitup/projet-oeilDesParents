import React from "react";

import useSocket from "../hooks/useSocket";

import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";

import BabyOverview from "../components/baby/BabyOverview";
import BabySummary from "../components/baby/BabySummary";
import BabyBehavior from "../components/baby/BabyBehavior";
import BabyDangerChart from "../components/baby/BabyDangerChart";
import BabyRecommendation from "../components/baby/BabyRecommendation";
import BabyHistory from "../components/baby/BabyHistory";

import "../styles/baby-page.css";

export default function BabyPage() {

  const data = useSocket() || {};

  console.log(
  JSON.stringify(data, null, 2)
  );
  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        <TopBar
          systemState={data?.etat_systeme}
          alerts={data?.alertes}
        />

        <div className="content">

          <div className="baby-layout">

            {/* ROW 1 */}
            <div className="baby-card baby-overview">
              <BabyOverview data={data} />
            </div>

            <div className="baby-card baby-summary">
              <BabySummary data={data} />
            </div>

            {/* ROW 2 */}
            <div className="baby-card baby-behavior">
              <BabyBehavior data={data} />
            </div>

            {/* ROW 3 - FULL WIDTH */}
            <div className="baby-card baby-danger">
              <BabyDangerChart data={data} />
            </div>

            {/* ROW 4 */}
            <div className="baby-card baby-recommendation">
              <BabyRecommendation data={data} />
            </div>

            <div className="baby-card baby-history">
              <BabyHistory data={data} />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}