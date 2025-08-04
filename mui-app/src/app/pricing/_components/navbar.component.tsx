"use client";

import { alpha } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

const navLinks = ["FEATURES", "ENTERPRISE", "SUPPORT"];

export default function PricingNavbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: alpha("#000000", 0.1),
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            py: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            color="text.secondary"
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              lineHeight: "18px",
            }}
          >
            Company name
          </Typography>

          <Stack direction="row" spacing={3.125} alignItems="center">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="#"
                variant="body2"
                underline="none"
                sx={{
                  color: "#000000",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "18px",
                }}
              >
                {link}
              </Link>
            ))}

            <Button
              variant="outlined"
              size="small"
              sx={{
                px: 3,
                py: 1,
                color: "rgba(0, 0, 0, 0.87)",
                borderColor: "rgba(0, 0, 0, 0.36)",
                fontWeight: 600,
                lineHeight: "18px",
              }}
            >
              Login
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
