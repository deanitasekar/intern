"use client";

import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MdNotifications, MdMenu } from "react-icons/md";
import React from "react";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        bgcolor: "primary.main",
        zIndex: 1,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          sx={{ 
            mr: 2,
            display: { md: "none" }
          }}
        >
          <MdMenu size={24} />
        </IconButton>
        
        <Typography
          variant="h4"
          component="h1"
          sx={{
            flexGrow: 1,
            textAlign: "left",
            fontSize:"20px",
            fontWeight:"600",
            lineHeight:"24px",
            letterSpacing:"0.15px"
          }}
        >
          Dashboard
        </Typography>
        
        <IconButton
          color="inherit"
          sx={{ ml: 2 }}
        >
          <Badge
            badgeContent={4}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.75rem",
                height: 18,
                minWidth: 18,
              },
            }}
          >
            <MdNotifications size={24} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}