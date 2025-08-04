"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {
  MdChevronLeft,
  MdChevronRight
} from "react-icons/md";



const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19 3H4.99C3.88 3 3.01 3.9 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15ZM16 10H14V7H10V10H8L12 14L16 10Z"
      fill="currentColor"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
    />
  </svg>
);

const PeopleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.5 12C17.88 12 18.99 10.88 18.99 9.5C18.99 8.12 17.88 7 16.5 7C15.1193 7 14 8.11929 14 9.5C14 10.8807 15.1193 12 16.5 12ZM9 11C10.66 11 11.99 9.66 11.99 8C11.99 6.34 10.66 5 9 5C7.34 5 6 6.34 6 8C6 9.66 7.34 11 9 11ZM16.5 14C14.67 14 11 14.92 11 16.75V19H22V16.75C22 14.92 18.33 14 16.5 14ZM9 13C6.67 13 2 14.17 2 16.5V19H9V16.75C9 15.9 9.33 14.41 11.37 13.28C10.5 13.1 9.66 13 9 13Z"
      fill="currentColor"
    />
  </svg>
);

const ReportsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 2C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2H6ZM13 9V3.5L18.5 9H13Z"
      fill="currentcolor"
    />
  </svg>
);

const IntegrationsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M2 9H0V20C0 21.11 0.89 22 2 22H16C17.11 22 18 21.11 18 20H2V9Z"
      fill="currentColor"
    />
    <path
      d="M21 3H5C3.9 3 3.01 3.9 3.01 5L3 17C3 18.1 3.9 19 5 19H21C22.1 19 23 18.1 23 17V5C23 3.9 22.1 3 21 3ZM21 7L13 12L5 7V5L13 10L21 5V7Z"
      fill="currentColor"
    />
  </svg>
);

const SavedReportsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19 4H14.82C14.4 2.84 13.3 2 12 2C10.7 2 9.6 2.84 9.18 4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM12 4C12.55 4 13 4.45 13 5C13 5.55 12.55 6 12 6C11.45 6 11 5.55 11 5C11 4.45 11.45 4 12 4ZM14 18H7V16H14V18ZM17 14H7V12H17V14ZM17 10H7V8H17V10Z"
      fill="currentColor"
    />
  </svg>
);

const mainMenuItems = [
  { text: "Dashboard", icon: DashboardIcon },
  { text: "Orders", icon: CartIcon },
  { text: "Customers", icon: PeopleIcon },
  { text: "Reports", icon: ReportsIcon },
  { text: "Integrations", icon: IntegrationsIcon },
];

const reportsMenuItems = [
  { text: "Current month", icon: SavedReportsIcon },
  { text: "Last quarter", icon: SavedReportsIcon },
  { text: "Year-end sale", icon: SavedReportsIcon },
];

interface DashboardSidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function DashboardSidebar({
  open,
  onToggle,
}: DashboardSidebarProps) {
  const sidebarWidth = 240;
  const collapsedWidth = 72;

  const handleToggle = () => {
    onToggle();
  };

  const SidebarContent = () => (
    <Box
      sx={{
        width: open ? sidebarWidth : collapsedWidth,
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 1,
          minHeight: 64,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <IconButton
          onClick={handleToggle}
          sx={{
            color: "text.secondary",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          {open ? <MdChevronLeft size={20} /> : <MdChevronRight size={20} />}
        </IconButton>
      </Box>

      <List sx={{ py: 1, borderBottom: 1, borderColor: "divider" }}>
        {mainMenuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  flexDirection: open ? "row" : "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 48,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: open ? 40 : 0,
                    justifyContent: "center",
                    mb: open ? 0 : 0.5,
                  }}
                >
                  <IconComponent />
                </ListItemIcon>

                {open && (
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        sx={{
                          textAlign: "left",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: "16px",
                          fontWeight: "400",
                          lineHeight: "20px",
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {open && (
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              px: 2,
              display: "block",
            }}
          >
            Saved reports
          </Typography>
        </Box>
      )}

      <List sx={{ py: 1 }}>
        {reportsMenuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  minHeight: 48,
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: "text.secondary",
                  }}
                >
                  <IconComponent />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: "left",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: "16px",
                          fontWeight: "400",
                          lineHeight: "20px",
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: { sm: "none", md: "block" } }}>
        <SidebarContent />
      </Box>

      <Drawer
        variant="temporary"
        open={open}
        onClose={onToggle}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
}
