"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import AlbumCard from "./card.component";

const albumItems = [
  {
    id: 1,
    title: "Heading",
    description: "This is a media card. You can use this section to describe the content.",
    image: "/album-1.png",
  },
  {
    id: 2,
    title: "Heading",
    description: "This is a media card. You can use this section to describe the content.",
    image: "/album-2.png",
  },
  {
    id: 3,
    title: "Heading",
    description: "This is a media card. You can use this section to describe the content.",
    image: "/album-3.png",
  },
];

export default function AlbumGrid() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            sm: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 4,
        }}
      >
        {albumItems.map((item) => (
          <Box key={item.id}>
            <AlbumCard
              title={item.title}
              description={item.description}
              image={item.image}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}