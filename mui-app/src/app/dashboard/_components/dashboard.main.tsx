"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import React from "react";
import DashboardHeader from "./header.component";
import DashboardSidebar from "./sidebar.component";
import DashboardChart from "./chart.component";
import DashboardDeposit from "./deposit.component";
import DashboardOrder from "./order.component";

import { dummyData } from "@/data/dummy-data";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const data = dummyData[0];

  const handleSidebarToggle = React.useCallback(() => {
    console.log('Toggling sidebar from:', sidebarOpen, 'to:', !sidebarOpen);
    setSidebarOpen(prev => !prev);
  }, [sidebarOpen]);

  React.useEffect(() => {
    console.log('Sidebar state changed to:', sidebarOpen);
  }, [sidebarOpen]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <DashboardSidebar 
        open={sidebarOpen} 
        onToggle={handleSidebarToggle}
      />
      
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <DashboardHeader onMenuClick={handleSidebarToggle} />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: "grey.50",
            transition: "margin 0.3s ease",
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack
                direction={{ sm: "column", lg: "row" }}
                spacing={3}
              >
                <Box sx={{ flex: 2 }}>
                  <DashboardChart
                    title="Today"
                    data={data.todaySales}
                  />
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <DashboardDeposit
                    title="Recent Deposits"
                    data={data.recentDeposits}
                  />
                </Box>
              </Stack>
              
              <DashboardOrder
                title="Recent Orders"
                data={data.recentOrders}
                maxRows={5}
              />
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}