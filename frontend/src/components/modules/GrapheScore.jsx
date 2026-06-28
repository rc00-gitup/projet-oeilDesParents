import React from "react";
import { useEffect, useState, useMemo } from "react";
import "./GrapheScore.css";

const WINDOW_MS = 10 * 60 * 1000;

export default function GrapheScore({ data }) {
  const score = data?.score_danger ?? 0;

  const [history, setHistory] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const now = Date.now();

    setHistory((prev) => {
      const updated = [
        ...prev,
        {
          value: score,
          time: now,
          activity: data?.activite || "unknown",
        },
      ];

      return updated.filter(
        (d) => now - d.time <= WINDOW_MS
      );
    });
  }, [score, data?.activite]);

  const width = 700;
  const height = 260;
  const padding = 45;

  const formatTime = (t) => {
    const d = new Date(t);

    return `${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const getActivityLabel = (activity) => {
    switch (activity) {
      case "crying":
        return "😭 Bébé pleure";

      case "sleeping":
        return "😴 Bébé dort";

      case "active":
      case "awake":
        return "👶 Bébé éveillé";

      case "absent":
        return "❌ Bébé absent";

      default:
        return "👶 État inconnu";
    }
  };

  const { bars, ticks } = useMemo(() => {
    if (!history.length)
      return { bars: [], ticks: [] };

    const end = Date.now();
    const start = end - WINDOW_MS;

    const bars = history
      .filter((d) => d.time >= start)
      .map((d) => {
        const ratio =
          (d.time - start) / WINDOW_MS;

        const x =
          padding +
          ratio * (width - padding * 2);

        const barHeight =
          (d.value / 100) *
          (height - padding * 2);

        const y =
          height -
          padding -
          barHeight;

        return {
          ...d,
          x,
          y,
          barHeight,
        };
      });

    const ticks = [];
    const step = 60 * 1000;

    const first =
      Math.floor(start / step) * step;

    const last =
      Math.ceil(end / step) * step;

    for (
      let t = first;
      t <= last;
      t += step
    ) {
      const ratio =
        (t - start) / WINDOW_MS;

      ticks.push({
        time: t,
        x:
          padding +
          ratio *
            (width - padding * 2),
      });
    }

    return { bars, ticks };
  }, [history]);

  return (
    <div className="graph-card">

      <div className="graph-title">
        📊 Score danger

        <span className="graph-subtitle">
          histogramme 10 min glissantes
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="graph-svg"
      >

        {[0, 25, 50, 75, 100].map((v) => {
          const y =
            height -
            (v / 100) *
              (height - padding * 2) -
            padding;

          return (
            <g key={v}>
              <line
                x1={padding}
                x2={width - padding}
                y1={y}
                y2={y}
                stroke="#e5e7eb"
              />

              <text
                x="10"
                y={y + 4}
                fontSize="12"
              >
                {v}
              </text>
            </g>
          );
        })}

        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={t.x}
              x2={t.x}
              y1={padding}
              y2={height - padding}
              stroke="#f3f4f6"
            />

            <text
              x={t.x}
              y={height - 10}
              fontSize="11"
              textAnchor="middle"
              fill="#6b7280"
            >
              {formatTime(t.time)}
            </text>
          </g>
        ))}

        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#111827"
        />

        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#111827"
        />

        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.x - 6}
            y={b.y}
            width={12}
            height={b.barHeight}
            fill="#f97316"
            rx="2"
            onMouseEnter={() =>
              setHovered(b)
            }
            onMouseLeave={() =>
              setHovered(null)
            }
          />
        ))}
      </svg>

      {hovered && (
        <div className="tooltip">
          <div>
            <strong>
              Score : {hovered.value}%
            </strong>
          </div>

          <div>
            🕒 {formatTime(hovered.time)}
          </div>

          <div>
            {getActivityLabel(
              hovered.activity
            )}
          </div>
        </div>
      )}

      <div className="graph-value">
        Score actuel :
        <strong> {score}%</strong>
      </div>

    </div>
  );
}