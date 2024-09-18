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
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import CustomAvatar from "../CustomAvatar";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Link } from "react-router-dom";
import { setActiveTab } from "../../service/features/sideBarSlice";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
export default function Sidebar() {
  const dispatch = useDispatch()
  const {activePage} = useSelector((state)=>state.sideBar)
  const [mobileOpen, setMobileOpen] = useState(false); // State for sidebar visibility on mobile
  const drawerWidth = 240;
  const { user } = useSelector((state) => state.auth);

  // Menu items with click handlers
  const organizerMenu = [
    { text: "Dashboard", icon: <DashboardIcon />, key: "dashboard" },
    { text: "Organized Events", icon: <CalendarTodayIcon />, key: "organizedEvents" },
    { text: "Upcoming Events", icon: <WorkIcon />, key: "upcomingEvents" },
    
    { text: "Pending Events", icon: <PendingActionsIcon />, key: "pendingEvents" },
    { text: "Rejected Events", icon: <ThumbDownOffAltIcon />, key: "rejectedEvents" },
    { text: "Edit Events", icon: <DescriptionIcon />, key: "editEvents" },

   
  ];

  
  // Menu items with click handlers
  const adminMenu = [
    { text: "Dashboard", icon: <DashboardIcon />, key: "dashboard" },
    { text: "Events", icon: <CalendarTodayIcon />, key: "allEvents" },
    { text: "Users", icon: <PeopleAltIcon />, key: "allUsers" },

  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function mappingMenu(menu){
  return  menu.map((item, index) => (
      <ListItem
        button
        key={index}
        onClick={() => dispatch(setActiveTab(item.key))} // Pass the key to parent component
        sx={{
          backgroundColor: activePage === item.key ? "#3b82f6" : "transparent",
          color: activePage === item.key ? "#ffffff" : "#9CA3AF",
          "&:hover": {
            backgroundColor: "#1e40af",
            color: "#ffffff",
          },
        }}
      >
        <ListItemIcon sx={{ color: activePage === item.key ? "#ffffff" : "#9CA3AF" }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    ))
  }
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
        {user?.role == "Admin"? mappingMenu(adminMenu):mappingMenu(organizerMenu) }
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
