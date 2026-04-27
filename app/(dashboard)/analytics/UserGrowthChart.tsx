"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserGrowthChart({
  data,
}: {
  data: { date: string; users: number }[];
}) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-75 text-slate-400">
        <p>No data yet — invite team members to see growth</p>
      </div>
    );
  }

  if (data.length === 1) {
    return (
      <div className="flex items-center justify-center h-75 text-slate-400">
        <p>Need at least 2 data points to show the chart</p>
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="date" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#6366f1"
          strokeWidth={2}
          fill="url(#userGradient)"
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
