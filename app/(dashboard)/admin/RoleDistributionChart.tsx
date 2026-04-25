"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function RoleDistributionChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const COLORS = ["#6366f1", "#22c55e"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie // ← only ONE Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
