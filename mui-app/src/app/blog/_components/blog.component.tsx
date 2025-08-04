"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

interface BlogPostData {
  title: string;
  date: string;
  author: string;
  content: string[];
}

const samplePost: BlogPostData = {
  title: "Sample blog post",
  date: "April 1, 2020",
  author: "Olivier",
  content: [
    "This blog post shows a few different types of content that are supported and styled with Material styles. Basic typography, images, and code are all supported. You can extend these by modifying Markdown.js.",
    "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.",
    "Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.",
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  ],
};

export default function BlogContent() {
  return (
    <Box
      sx={{
        display: { sm: "block", md: "flex" },
        flexDirection: { sm: "column", md: "row" },
        pb: 6,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          component="h3"
          color="text.primary"
          sx={{
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "58px",
          }}
        >
          From the Firehore
        </Typography>

        <Box>
          <Divider sx={{ mt: 1, mb: 2 }} />
        </Box>

        <Box sx={{ mb: 4 }}>
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
            {samplePost.title}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "58px",
            }}
          >
            {samplePost.date} by{" "}
            <Link href="#" color="primary" underline="none">
              {samplePost.author}
            </Link>
          </Typography>

          <Box sx={{ mb: 4 }}>
            {samplePost.content.map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                color="text.primary"
                sx={{
                  mb: 1.5,
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "24px",
                }}
              >
                {paragraph}
              </Typography>
            ))}
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
              Heading
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                mb: 1.5,
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
              }}
            >
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
              ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </Typography>

            <Typography
              variant="h6"
              component="h4"
              color="text.primary"
              sx={{
                textAlign: "left",
                fontSize: "16px",
                fontWeight: "400",
                lineheight: "24px",
              }}
            >
              Sub-heading
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                mb: 1.5,
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
              }}
            >
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
