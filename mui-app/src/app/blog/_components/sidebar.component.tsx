"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

const archiveLinks = [
  "March 2020",
  "February 2020",
  "January 2020",
  "December 2019",
  "November 2019",
  "October 2019",
  "September 2019",
  "August 2019",
  "July 2019",
  "June 2019",
  "May 2019",
  "April 2019",
];

const socialLinks = [
  { name: "GitHub", url: "#" },
  { name: "Twitter", url: "#" },
  { name: "Facebook", url: "#" },
];

export default function BlogSidebar() {
  return (
    <Stack spacing={4}>
      <Box
        sx={{
          bgcolor: "#F5F5F5;",
          px: 1.5,
          py: 1.5,
          borderRadius: "4px",
        }}
      >
        <Typography
          variant="h6"
          component="h4"
          color="text.primary"
          sx={{
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "58px",
          }}
        >
          About
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "24px",
          }}
        >
          Etiam porta sem malesuada magna mollis euismod. Cras mattis
          consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla
          sed consectetur.
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="h6"
          component="h4"
          color="text.primary"
          sx={{
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "58px",
          }}
        >
          Archives
        </Typography>

        <Stack spacing={0.1}>
          {archiveLinks.map((archive) => (
            <Link
              key={archive}
              href="#"
              variant="body1"
              color="primary"
              underline="none"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
              }}
            >
              {archive}
            </Link>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography
          variant="h6"
          component="h4"
          color="primary.text"
          sx={{
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "58px",
          }}
        >
          Social
        </Typography>

        <Stack spacing={0.1}>
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              variant="body1"
              color="primary"
              underline="none"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
              }}
            >
              {social.name}
            </Link>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
