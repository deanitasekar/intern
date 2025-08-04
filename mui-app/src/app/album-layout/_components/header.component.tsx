"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

export default function AlbumHeader() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 3,
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <Typography
        component="h1"
        variant="h3"
        color="text.primary"
        sx={{
          mb: 3.475,
          fontSize: "60px",
          fontWeight: "300",
          lineHeight: "18px",
        }}
      >
        Album layout
      </Typography>

      <Typography
        variant="h5"
        color="text.secondary"
        component="h2"
        sx={{
          maxWidth: 530,
          mx: "auto",
          mt: 3.475,
          mb: 3.475,
          fontSize: "24px",
          fontWeight: "300",
          lineHeight: "30px",
        }}
      >
        Something short and leading about the collection below—its contents, the
        creator, etc. Make it short and sweet, but not too short so folks don't
        simply skip over it entirely.
      </Typography>

      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={1.875}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "18px",
          }}
        >
          Main call to action
        </Button>

        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "18px",
          }}
        >
          Secondary action
        </Button>
      </Stack>
    </Box>
  );
}
