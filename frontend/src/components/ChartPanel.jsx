import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function ChartPanel({ history }) {
  return (
    <div style={{ width: "100%", height: "300px", minHeight: "300px" }}>

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={history}>

          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#3b82f6"
            strokeWidth={3}
            connectNulls
          />

          <Line
            type="monotone"
            dataKey="son"
            stroke="#f59e0b"
            strokeWidth={3}
            connectNulls
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}