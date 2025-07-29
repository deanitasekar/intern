"use client";

import { Add, Close, Home, Menu } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export const NavBar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        <ListItem
          component={Link}
          href="/"
          onClick={handleDrawerToggle}
          sx={{
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "rgba(33, 150, 243, 0.08)",
            },
          }}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          component={Link}
          href="/create"
          onClick={handleDrawerToggle}
          sx={{
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "rgba(33, 150, 243, 0.08)",
            },
          }}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="New Article" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        mb: 4,
        backgroundColor: "background.paper",
        color: "text.primary",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: 0 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="div"
              sx={{
                cursor: "pointer",
                fontWeight: 700,
                color: "text.primary",
                letterSpacing: "-0.02em",
              }}
            >
              Blog
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 1,
            }}
          >
            <Button
              component={Link}
              href="/"
              color="inherit"
              startIcon={<Home />}
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.08)",
                  color: "primary.main",
                },
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
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(33, 150, 243, 0.25)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              New Article
            </Button>
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              color: "text.primary",
            }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};
