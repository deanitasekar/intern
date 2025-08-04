"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface AlbumCardProps {
  title: string;
  description: string;
  image: string;
}

export default function AlbumCard({
  title,
  description,
  image,
}: AlbumCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 2,
        transition: "all 0.3s ease-in-out",
        borderRadius: "4px",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="h3"
          sx={{
            alignSelf: "flex-start",
            mb: 1.25,
            fontSize: "24px",
            fontWeight: "400",
            lineHeight: "24px",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            flexGrow: 1,
            mb: 2.625,
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "24px",
            letterSpacing: "0.1px",
          }}
        >
          {description}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="text"
            color="primary"
            size="small"
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "18px",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "transparent",
              },
              "&:focus": {
                boxShadow: "none",
                backgroundColor: "transparent",
              },
              "&:active": {
                boxShadow: "none",
                backgroundColor: "transparent",
                fontWeight: "bold",
              },
            }}
          >
            View
          </Button>

          <Button
            variant="text"
            color="primary"
            size="small"
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "18px",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "transparent",
              },
              "&:focus": {
                boxShadow: "none",
                backgroundColor: "transparent",
              },
              "&:active": {
                boxShadow: "none",
                backgroundColor: "transparent",
                fontWeight: "bold",
              },
            }}
          >
            Edit
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
