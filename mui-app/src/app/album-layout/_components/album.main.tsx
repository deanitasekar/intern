"use client";

import Box from "@mui/material/Box";
import React from "react";
import AlbumHeader from "./header.component";
import AlbumGrid from "./grid.component";

export default function AlbumMain() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <AlbumHeader />

      <AlbumGrid />
    </Box>
  );
}