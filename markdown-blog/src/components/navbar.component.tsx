'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import { Home, Add } from '@mui/icons-material';
import Link from 'next/link';

export const NavBar: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        mb: 4,
        backgroundColor: 'background.paper',
        color: 'text.primary'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: 0 }}>
          <Link 
            href="/" 
            style={{ 
              textDecoration: 'none', 
              color: 'inherit', 
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                cursor: 'pointer',
                fontWeight: 700,
                color: 'text.primary',
                letterSpacing: '-0.02em'
              }}
            >
              Blog
            </Typography>
          </Link>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              component={Link}
              href="/"
              color="inherit"
              startIcon={<Home />}
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.08)',
                  color: 'primary.main'
                }
              }}
            >
              Home
            </Button>
            <Button 
              component={Link}
              href="/create"
              variant="contained"
              startIcon={<Add />}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(33, 150, 243, 0.25)',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              New Article
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
