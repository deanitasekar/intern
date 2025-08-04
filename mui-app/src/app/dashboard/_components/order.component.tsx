"use client";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";

interface OrderData {
  date: string;
  name: string;
  shipTo: string;
  paymentMethod: string;
  saleAmount: number;
}

interface DashboardOrdersProps {
  title: string;
  data: OrderData[];
  maxRows?: number;
}

export default function DashboardOrders({
  title,
  data,
  maxRows = 5,
}: DashboardOrdersProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const displayData = data.slice(0, maxRows);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h5"
        component="h2"
        color="primary"
        sx={{
          mb: 1,
          textAlign: "left",
          fontSize: "20px",
          fontWeight: "600",
          lineHeight: "24px",
        }}
      >
        {title}
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ship To</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Sale Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((order, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.shipTo}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell align="right">
                  {formatCurrency(order.saleAmount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Link
        href="#"
        variant="body2"
        color="primary"
        underline="none"
        sx={{
          mt: 2,
        }}
      >
        See more orders
      </Link>
    </Paper>
  );
}
