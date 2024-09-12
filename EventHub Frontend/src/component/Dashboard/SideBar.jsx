import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Typography
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomAvatar from "../CustomAvatar";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false); // State for sidebar visibility on mobile
  const drawerWidth = 240;
  const location = useLocation(); // Get current route
  const { user } = useSelector((state) => state.auth);
  const organizerMenu = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
    { text: "Organized Events", icon: <CalendarTodayIcon />, link: `/organized-events/${user._id}` },
    { text: "Upcoming Events", icon: <WorkIcon />, link: `/upcoming-events/${user._id}` },
    { text: "Edit Events", icon: <DescriptionIcon />, link: `/edit-events/${user._id}` },
    { text: "Reports", icon: <AssessmentIcon />, link: `/reports/${user._id}` },
  ];



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          p: 2,
          borderBottom: "1px solid #374151",
        }}
      >
        <CustomAvatar str={user?.first_name || "User"} />
        <Typography className="capitalize" variant="h6" sx={{ marginLeft: 1 }}>
          {user.first_name} {user.last_name}
          {user.role === "Admin" ? (
            <span className="text-red-500 text-3xl">*</span>
          ) : null}
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {organizerMenu.map((item, index) => (
          <Link to={item.link} key={index} style={{ textDecoration: "none" }}>
            <ListItem
              button
              sx={{
                backgroundColor: location.pathname === item.link ? "#3b82f6" : "transparent",
                color: location.pathname === item.link ? "#ffffff" : "#9CA3AF",
                "&:hover": {
                  backgroundColor: "#1e40af",
                  color: "#ffffff",
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.link ? "#ffffff" : "#9CA3AF" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Box sx={{ mt: "auto", borderTop: "1px solid #374151" }}>
        <Link to={"/"}>
          <ListItem button>
            <ListItemIcon sx={{ color: "#9CA3AF" }}>
              <ArrowBackIosNewIcon />
            </ListItemIcon>
            <ListItemText primary="Back" />
          </ListItem>
        </Link>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Menu button for mobile view */}
      <IconButton
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" }, // Show on mobile (xs) and hide on larger (sm) screens
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 1300,
          color: "black",
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", sm: "block" }, // Hide on mobile, show on desktop
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#111827",
            color: "#fff",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Sidebar for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" }, // Show on mobile, hide on desktop
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#111827",
            color: "#fff",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
