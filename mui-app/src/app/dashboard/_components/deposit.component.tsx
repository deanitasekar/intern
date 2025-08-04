"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

interface DepositsData {
  amount: number;
  date: string;
}

interface DashboardDepositsProps {
  title: string;
  data: DepositsData;
}

export default function DashboardDeposits({
  title,
  data,
}: DashboardDepositsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Paper
      sx={{
        p: 3,
        height: 320,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          component="h2"
          color="primary"
          sx={{
            mb: 2.5,
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "24px",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          component="h3"
          color="text.primary"
          sx={{
            textAlign: "left",
            fontSize: "32px",
            fontWeight: "400",
            lineHeight: "24px",
          }}
        >
          {formatCurrency(data.amount)}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.75,
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
            }}
          >
            on {data.date}
          </Typography>
        </Typography>
      </Box>

      <Link
        href="#"
        variant="body2"
        color="primary"
        underline="none"
        sx={{
          alignSelf: "flex-start",
          mt: 2,
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "24px",
        }}
      >
        View balance
      </Link>
    </Paper>
  );
}
