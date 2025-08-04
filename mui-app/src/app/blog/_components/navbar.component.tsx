"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { IoIosSearch } from "react-icons/io";
import React from "react";

const categories = [
  "Technology",
  "Design",
  "Culture",
  "Business",
  "Politics",
  "Opinion",
  "Science",
  "Health",
  "Style",
  "Travel",
];

export default function BlogNavbar() {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", p: 1 }}>
      <Container maxWidth="lg">
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <Link
              href="#"
              variant="body2"
              color="inherit"
              underline="none"
              sx={{
                textTransform: "uppercase",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "18px",
                color: "text.secondary",
              }}
            >
              Subscribe
            </Link>

            <Typography
              variant="h4"
              component="h2"
              color="text.primary"
              sx={{
                fontSize: "24px",
                fontWeight: "600",
                lineHeight: "18px",
              }}
            >
              Blog
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <IoIosSearch size={20} />
              </IconButton>

              <Button
                variant="outlined"
                size="small"
                color="inherit"
                sx={{
                  fontSize: "12px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  color: "rgba(0, 0, 0, 0.54)",
                  height: "32px",
                }}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>

            <Divider />

          <Stack
            direction="row"
            sx={{
              display: "flex",
              gap: 0.75,
              justifyContent: "space-between",
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              mt: 1.5,
            }}
          >
            {categories.map((category) => (
              <Link
                key={category}
                href="#"
                variant="body1"
                underline="none"
                sx={{
                  color:"rgba(0, 0, 0, 0.54)",
                }}
              >
                {category}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
