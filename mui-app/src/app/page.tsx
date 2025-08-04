import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function HomePage() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 4 }}>
        <Button variant="outlined" href="/sign-in">
          Sign In
        </Button>
        <Button variant="contained" href="/sign-up">
          Sign Up
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" size="large" href="/album-layout">
          Album Layout
        </Button>
        <Button variant="contained" size="large" href="/blog">
          Blog
        </Button>
        <Button variant="contained" size="large" href="/checkout">
          Checkout
        </Button>
        <Button variant="contained" size="large" href="/dashboard">
          Dashboard
        </Button>
        <Button variant="contained" size="large" href="/pricing">
          Pricing
        </Button>
      </Box>
    </Container>
  );
}
