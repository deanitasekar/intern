"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

const footerSections = [
  {
    title: "Company",
    links: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    links: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    links: ["Resource", "Resource name", "Another resource", "Final resource"],
  },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms of use"],
  },
];

export default function PricingFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 8,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="md">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
        >
          {footerSections.map((section) => (
            <Box key={section.title} sx={{ flex: 1 }}>
              <Stack spacing={2}>
                <Typography
                  variant="h6"
                  component="h4"
                  sx={{
                    color:"#000000",
                    fontSize:"20px",
                    fontWeight:"600",
                    lineHeight:"18px",
                    alignSelf: "flex-start",
                    mb: 1.85,
                  }}
                >
                  {section.title}
                </Typography>

                <Stack spacing={1.5}>
                  {section.links.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      variant="body2"
                      color="text.secondary"
                      underline="none"
                      sx={{
                        fontSize:"16px",
                        fontWeight:"400",
                        lineHeight:"28px",
                      }}
                    >
                      {link}
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
