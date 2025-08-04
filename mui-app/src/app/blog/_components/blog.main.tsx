"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import React from "react";
import BlogNavbar from "./navbar.component";
import BlogHero from "./hero.component";
import BlogCard from "./card.component";
import BlogContent from "./blog.component";
import BlogSidebar from "./sidebar.component";

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "/blog-card.png",
  },
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "/blog-card.png",
  },
];

export default function BlogMain() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <BlogNavbar />

      <BlogHero />

      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ mb: 6 }}
        >
          {featuredPosts.map((post, index) => (
            <Box key={index} sx={{ flex: 1 }}>
              <BlogCard
                title={post.title}
                date={post.date}
                description={post.description}
                image={post.image}
              />
            </Box>
          ))}
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{ 
            pb: 2,
            alignItems: "flex-start",
          }}
        >
          <Box 
            sx={{ 
              flex: { xs: "1 1 100%", md: "2 1 0%" },
              width: { xs: "100%", md: "auto" },
              minWidth: 0,
            }}
          >
            <BlogContent />
          </Box>

          <Box 
            sx={{ 
              flex: { xs: "1 1 100%", md: "1 1 0%" },
              width: { xs: "100%", md: "auto" },
              maxWidth: { xs: "100%", md: "300px" },
              alignSelf: "flex-start",
            }}
          >
            <BlogSidebar />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}