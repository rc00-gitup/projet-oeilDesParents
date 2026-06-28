import React from "react";

export default function BabyOverview({ data }) {

  const score = data?.score_danger || 0;

  let status = "Stable";

  if (score >= 80) status = "Danger";
  else if (score >= 50) status = "Vigilance";

  return (
    <>
      <h2>👶 État Général</h2>

      <div className="baby-overview-box">

        <div className="avatar-icon">
          👶
        </div>

        <div>

          <h3>{status}</h3>

          <p>
            Surveillance en temps réel active.
          </p>

          <div className="live-box">
            <span className="live-dot"></span>
            Analyse IA active
          </div>

        </div>

      </div>
    </>
  );
}