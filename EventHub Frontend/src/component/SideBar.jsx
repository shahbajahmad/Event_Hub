import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Sidebar() {
  const drawerWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Team', icon: <PeopleIcon /> },
    { text: 'Projects', icon: <WorkIcon /> },
    { text: 'Calendar', icon: <CalendarTodayIcon /> },
    { text: 'Documents', icon: <DescriptionIcon /> },
    { text: 'Reports', icon: <AssessmentIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#111827',
          color: '#fff',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          borderBottom: '1px solid #374151',
        }}
      >
        <Avatar alt="User" src="/avatar.png" />
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          Tom Cook
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon sx={{ color: '#9CA3AF' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <List sx={{ mt: 'auto', borderTop: '1px solid #374151' }}>
        <ListItem button>
          <ListItemIcon sx={{ color: '#9CA3AF' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
}
