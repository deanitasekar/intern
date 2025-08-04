"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";
import ShippingForm from "./shipping.component";

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function CheckoutMain() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Stack
        maxWidth={800}
        margin="0 auto"
        spacing={1}
        sx={{ p: { sx: 2, sm: 3 } }}
      >
        <Typography
          component="h1"
          variant="h4"
          color="text.primary"
          textAlign="center"
          sx={{
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: "18px",
          }}
        >
          Check out
        </Typography>

        <Paper
          elevation={0}
          sx={{
            py: { xs: 2, sm: 3 },
            px: 3,
          }}
        >
          <Stepper activeStep={activeStep} orientation="horizontal" sx={{
            display:"flex",
          }}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              return (
                <Step key={label} {...stepProps} >
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Paper>

        <Box
          sx={{
            p: { xs: 3, sm: 4 },
          }}
        >
          <ShippingForm />
        </Box>
      </Stack>
    </Box>
  );
}
