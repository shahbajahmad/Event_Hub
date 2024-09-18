import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/protected/analytics/admin`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Pass the token here
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [apiUrl, token]);

  if (loading) {
    return  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress size={80} />
  </Box>

  }

  if (!analytics) {
    return <Typography>No data available</Typography>;
  }

  // Ensure revenueOverTime data is available and properly formatted
  const revenueOverTime = analytics.revenueOverTime || [];

  return (
    <Box className="min-h-screen p-6 bg-gray-100">
      <Grid container spacing={4}>
        {/* Overview Cards */}
        <Grid item xs={12} md={3}>
          <Paper className="p-4 shadow-md rounded-md" elevation={3}>
            <Box display="flex" alignItems="center">
              <PeopleIcon style={{ fontSize: 40, marginRight: 10, color: '#3f51b5' }} />
              <Box>
                <Typography variant="h6" gutterBottom>Total Users</Typography>
                <Typography variant="h4">{analytics.totalUsers}</Typography>
                <Typography variant="body2">Organizers: {analytics.totalOrganizers}</Typography>
                <Typography variant="body2">Attendees: {analytics.totalAttendees}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper className="p-4 shadow-md rounded-md" elevation={3}>
            <Box display="flex" alignItems="center">
              <EventIcon style={{ fontSize: 40, marginRight: 10, color: '#f57c00' }} />
              <Box>
                <Typography variant="h6" gutterBottom>Total Events</Typography>
                <Typography variant="h4">{analytics.totalEvents}</Typography>
                <Typography variant="body2">Upcoming: {analytics.upcomingEvents}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper className="p-4 shadow-md rounded-md" elevation={3}>
            <Box display="flex" alignItems="center">
              <AttachMoneyIcon style={{ fontSize: 40, marginRight: 10, color: '#4caf50' }} />
              <Box>
                <Typography variant="h6" gutterBottom>Total Revenue</Typography>
                <Typography variant="h4">${analytics.totalRevenue}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper className="p-4 shadow-md rounded-md" elevation={3}>
            <Box display="flex" alignItems="center">
              <GroupAddIcon style={{ fontSize: 40, marginRight: 10, color: '#9c27b0' }} />
              <Box>
                <Typography variant="h6" gutterBottom>Free Registrations</Typography>
                <Typography variant="h4">{analytics.freeRegistrations}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
  <Paper className="p-4 shadow-md rounded-md" elevation={3}>
    <Typography variant="h6" gutterBottom>Revenue Over Time</Typography>
    <Box className="h-64">
      {analytics.revenueOverTime.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analytics.revenueOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" /> {/* Use 'date' key for the X axis */}
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" /> {/* Use 'revenue' key for the Y axis */}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="body1">No data available for Revenue Over Time.</Typography>
      )}
    </Box>
  </Paper>
</Grid>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4 shadow-md rounded-md" elevation={3}>
            <Typography variant="h6" gutterBottom>Recent Activities</Typography>
            <Divider className="mb-3" />
            <List>
              {analytics.recentActivities.map((activity, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${activity.user_id.first_name} ${activity.user_id.last_name} bought a ticket for ${activity.event_id?.name}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Top Events */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4 shadow-md rounded-md" elevation={3}>
            <Typography variant="h6" gutterBottom>Top 5 Best-Selling Events</Typography>
            <Divider className="mb-3" />
            <List>
              {analytics.topEvents.map((event, index) => (
                
                <ListItem key={index}>
                  <Box display="flex" textOverflow="ellipsis" alignItems="center" width="100%"> {/* Consistent width */}
                    <img
                      src={event.event.banner}
                      alt={event.event.name}
                      style={{ marginRight: 16, width: 100, height: 70, objectFit: 'contain' }}
                    />
                    <Typography variant="body1" className="font-semibold">
                      {event.event.name} 
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
