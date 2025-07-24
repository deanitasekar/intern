'use client';

import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Fade,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotFound() {

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Fade in timeout={600}>
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.02) 0%, rgba(255, 138, 128, 0.02) 100%)',
            border: '1px solid rgba(255, 107, 107, 0.08)',
          }}
        >
          <Typography
            variant="h1"
            component="div"
            sx={{
              fontSize: { xs: '6rem', md: '8rem' },
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A80 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              mb: 2,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              fontSize: '1.1rem',
              mb: 4,
              maxWidth: 500,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Oops! The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </Typography>
        </Paper>
      </Fade>
    </Container>
  );
}