"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

export default function BlogHero() {
  return (
    <Box
      sx={{
        position: "relative",
        height: 400,
        backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)), url(/hero.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        color: "white",
        mb: 6,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Typography
            variant="h3"
            component="h1"
            color="inherit"
            sx={{
              fontWeight: 600,
              fontSize:"48px",
              lineHeight:"58px",
              mb: 2,
              textAlign: "left",
            }}
          >
            Title of a longer featured blog post
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            color="inherit"
            sx={{
              fontsize:"24px",
              fontWeight:"400",
              lineHeight:"32px",
              mb: 2,
              textAlign: "left",
            }}
          >
            Multiple lines of text that form the lede, informing new readers
            quickly and efficiently about what's most interesting in this post's
            contents
          </Typography>

          <Link
            href="#"
            variant="body2"
            underline="none"
            sx={{
              alignSelf: "flex-start",
              color:"rgba(134, 144, 194, 1)",
              fontSize:"16px",
              fontWeight:"400",
              lineHeight:"58px",
            }}
          >
            Continue reading...
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
