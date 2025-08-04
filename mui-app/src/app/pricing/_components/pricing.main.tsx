"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import React from "react";
import PricingNavbar from "./navbar.component";
import PricingHeader from "./header.component";
import PricingCard from "./card.component";
import PricingFooter from "./footer.component";

const pricingPlans = [
  {
    title: "Free",
    price: 0,
    features: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined" as const,
  },
  {
    title: "Pro",
    price: 15,
    features: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained" as const,
    isPopular: true,
  },
  {
    title: "Enterprise",
    price: 30,
    features: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined" as const,
    isEnterprise: true,
  },
];

export default function PricingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <PricingNavbar />

      <PricingHeader />

      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={5}
          alignItems={{ xs: "center", md: "end" }}
          justifyContent="center"
        >
          {pricingPlans.map((plan) => (
            <Box
              key={plan.title}
              sx={{
                width: "100%",
                maxWidth: plan.isPopular ? "320px" : "280px",
                ...(plan.isPopular && {
                  order: { md: 0 },
                }),
              }}
            >
              <PricingCard
                title={plan.title}
                price={plan.price}
                features={plan.features}
                buttonText={plan.buttonText}
                buttonVariant={plan.buttonVariant}
                isPopular={plan.isPopular}
              />
            </Box>
          ))}
        </Stack>
      </Container>

      <PricingFooter />
    </Box>
  );
}
