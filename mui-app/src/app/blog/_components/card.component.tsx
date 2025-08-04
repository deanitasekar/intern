"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";

interface BlogFeaturedCardProps {
  title: string;
  date: string;
  description: string;
  image: string;
  readMoreLink?: string;
}

export default function BlogCard({
  title,
  date,
  description,
  image,
  readMoreLink = "#",
}: BlogFeaturedCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        height: 200,
        boxShadow: 1,
        borderRadius: "4px",
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: "16px",
          "&:last-child": {
            paddingBottom: "16px",
          },
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          color="text.primary"
          sx={{
            mb: "4px",
            fontSize: "24px",
            fontWeight: "400",
            lineHeight: "32px",
            alignSelf:"flex-start"
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mb: "12px",
            textTransform: "capitalize",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          {date}
        </Typography>

        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            mb: "16px",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "24px",
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>

        <Link
          href={readMoreLink}
          variant="body2"
          color="primary"
          underline="none"
          sx={{
            alignSelf: "flex-start",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            mt: "auto",
          }}
        >
          Continue reading...
        </Link>
      </CardContent>

      <Box
        sx={{
          width: 200,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexShrink: 0,
          borderTopRightRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      />
    </Card>
  );
}