"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

export default function PricingHeader() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 3,
      }}
    >
      <Typography component="h1" variant="h3" color="text.primary"
      sx={{
        fontSize:"60px",
        fontWeight:"300",
        lineHeight:"18px",
        mb:3.475,
      }}>
        Pricing
      </Typography>

      <Typography
        variant="h5"
        component="h2"
        color="text.secondary"
        sx={{
          maxWidth: 618,
          mx: "auto",
          mt: 3.475,
          fontSize:"24px",
          fontWeight:"300",
          lineHeight: "30px",
        }}
      >
        Quickly build an effective pricing table for your potential customers
        with this layout. It's built with default Material-UI components with
        little customization.
      </Typography>
    </Box>
  );
}
