"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import dayjs from "dayjs";
import { DailyRevenueDto } from "@/features/reports/types/report.types";

interface SalesChartProps {
  data: DailyRevenueDto[];
}

export function SalesChart({ data }: SalesChartProps) {
  const chartData = data.map((entry) => ({
    date: dayjs(entry.date).format("DD/MM"),
    revenue: entry.revenue,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} €`}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
          }}
          formatter={(value) => [
            `${Number(value).toFixed(2)} €`,
            "Chiffre d'affaires",
          ]}
        />
        <Legend iconType="circle" />
        <Bar
          dataKey="revenue"
          name="Chiffre d'affaires"
          fill="#ec4899"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
