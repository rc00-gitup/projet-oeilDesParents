import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function BabyDangerChart({ data }) {

  const history = data?.history || [];

  const score = data?.score_danger || 0;

  let color = "#22c55e";
  let status = "Stable";

  if (score >= 80) {
    color = "#ef4444";
    status = "Danger";
  }
  else if (score >= 50) {
    color = "#f59e0b";
    status = "Vigilance";
  }

  return (
    <>

      <h2>📈 Évolution du danger</h2>

      <div className="danger-header">

        <div>

          <div
            className="danger-score"
            style={{ color }}
          >
            {score}%
          </div>

          <div
            className="danger-status"
            style={{ color }}
          >
            {status}
          </div>

        </div>

        <div className="danger-sub">
          10 dernières minutes
        </div>

      </div>

      <div className="danger-info">

        <div className="danger-mini">

          <div className="danger-mini-label">
            🚨 Alertes
          </div>

          <div className="danger-mini-value">
            {data?.alertes?.length || 0}
          </div>

        </div>

        <div className="danger-mini">

          <div className="danger-mini-label">
            🖥️ Système
          </div>

          <div className="danger-mini-value">
            {data?.etat_systeme || "-"}
          </div>

        </div>

        <div className="danger-mini">

          <div className="danger-mini-label">
            📊 Tendance
          </div>

          <div className="danger-mini-value">
            {status}
          </div>

        </div>

      </div>

      <div className="danger-chart">

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={history}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
            />

            <YAxis
              domain={[0, 100]}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#ff7a00"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </>
  );
}