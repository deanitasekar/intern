"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import React from "react";

interface ChartData {
  time: string;
  amount: number;
}

interface DashboardChartProps {
  title: string;
  data: ChartData[];
}

export default function DashboardChart({ title, data }: DashboardChartProps) {
  const chartData = data.filter((_, index) => index % 3 === 0);

  return (
    <Paper
      sx={{
        p: 3,
        height: 320,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        color="primary"
        sx={{
          mb: 2,
          textAlign: "left",
          fontSize: "20px",
          fontWeight: "600",
          lineHeight: "24px",
        }}
      >
        {title}
      </Typography>

      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="time"
              axisLine={true}
              tickLine={true}
              tick={{
                fontSize: "14px",
                fontWeight:"400",
                fill: "rgba(0, 0, 0, 0.54)",
              }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={true}
              tickLine={true}
              tick={{
                fontSize: "14px",
                fontWeight:"400",
                fill: "rgba(0, 0, 0, 0.54)",
              }}
              domain={[0, "dataMax"]}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3F51B5"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: "#3F51B5",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
