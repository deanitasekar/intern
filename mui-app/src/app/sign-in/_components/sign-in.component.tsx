"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z"
    />
  </svg>
);

export default function SignInForm() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      margin="0 auto"
      spacing={3}
      sx={{ p: { sx: 3, sm: 4 } }}
    >
      <Avatar
        sx={{
          m: 1,
          width: 40,
          height: 40,
          bgcolor: "#E10050",
        }}
      >
        <LockIcon />
      </Avatar>

      <Typography
        component="h1"
        variant="h5"
        color="text.primary"
        sx={{
          fontSize: "24px",
          fontWeight: "400",
          lineHeight: "18px",
        }}
      >
        Sign in
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          width: "100%",
        }}
      >
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              height: "56px",
            }}
          />

          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
            sx={{
              height: "56px",
            }}
          />

          <FormControlLabel
            control={<Checkbox name="remember" color="primary" />}
            label="Remember me"
            sx={{ alignSelf: "flex-start" }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            sx={{
              height: "36px",
            }}
          >
            Sign In
          </Button>

          <Grid
            container
            spacing={{ xs: 0, sm: 2, md: 5 }}
            justifyContent="space-between"
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 1, sm: 0 },
            }}
          >
            <Link href="#" underline="none" variant="body2">
              Forgot password?
            </Link>

            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Typography variant="body2" color="primary">
                Don't have an account?
              </Typography>
              <Link
                href="/signup"
                underline="none"
                variant="body2"
                sx={{
                  fontWeight: "600",
                }}
              >
                Sign up
              </Link>
            </Box>
          </Grid>
        </Stack>
      </Box>
    </Stack>
  );
}
