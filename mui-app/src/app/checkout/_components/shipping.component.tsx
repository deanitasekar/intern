"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

export default function ShippingForm() {
  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          width: "100%",
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          color="primaryText"
          sx={{
            fontSize: "20px",
            fontWeight: "400",
            lineHeight: "18px",
            width: "100%",
            textAlign: "left",
            alignSelf: "flex-start",
            mb: 1.125,
          }}
        >
          Shipping address
        </Typography>

        <Stack spacing={1.5}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              required
              variant="standard"
              id="first-name"
              label="First name"
              name="firstName"
              autoComplete="first-name"
              sx={{ width: "48%" }}
            />

            <TextField
              required
              variant="standard"
              id="last-name"
              label="Last name"
              name="lastName"
              autoComplete="last-name"
              sx={{ width: "48%" }}
            />
          </Stack>

          <TextField
            required
            variant="standard"
            id="address-1"
            label="Address line 1"
            name="address1"
            autoComplete="address-1"
          />

          <TextField
            required
            variant="standard"
            id="address-2"
            label="Address line 2"
            name="address2"
            autoComplete="address-2"
          />

          <Box
            display="flex"
            gap={2}
            justifyContent="space-between"
            width="100%"
          >
            <TextField
              required
              variant="standard"
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              sx={{ width: "48%" }}
            />

            <TextField
              variant="standard"
              id="region"
              label="State / Province / Region"
              name="region"
              autoComplete="region"
              sx={{ width: "48%" }}
            />
          </Box>

          <Box
            display="flex"
            gap={2}
            justifyContent="space-between"
            width="100%"
          >
            <TextField
              required
              variant="standard"
              id="postal-code"
              label="Zip / Postal Code"
              name="postalCode"
              autoComplete="postal-code"
              sx={{ width: "48%" }}
            />

            <TextField
              required
              variant="standard"
              id="country"
              label="Country"
              name="country"
              autoComplete="country"
              sx={{ width: "48%" }}
            />
          </Box>
        </Stack>
        <FormControlLabel
          control={<Checkbox name="useAddress" color="primary" />}
          label="Use this address for payment details"
          sx={{ alignSelf: "flex-start", mt: 2 }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 4,
          pt: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            width:"69px",
            height: "36px",
          }}
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
}
