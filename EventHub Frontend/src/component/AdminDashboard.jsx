import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
} from '@mui/material';

import SalesBarChart from './SalesBarChart';

const AdminDashboard = () => {
  return (
    <Box className="min-h-screen bg-gray-100">
  
      {/* Content */}
      <Box className="p-6">
        <Grid container spacing={4}>
          {/* Overview Cards */}
          <Grid item xs={12} md={4}>
            <Paper className="p-4 shadow-lg bg-white">
              <Typography variant="h6" className="mb-2">
                Upcoming Events
              </Typography>
              <Typography variant="h4" className="text-blue-600">
                12
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Events scheduled in the next 30 days.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper className="p-4 shadow-lg bg-white">
              <Typography variant="h6" className="mb-2">
                Total Revenue
              </Typography>
              <Typography variant="h4" className="text-green-600">
                $34,500
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Revenue generated this month.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper className="p-4 shadow-lg bg-white">
              <Typography variant="h6" className="mb-2">
                New Registrations
              </Typography>
              <Typography variant="h4" className="text-red-600">
                45
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Registrations received today.
              </Typography>
            </Paper>
          </Grid>

          {/* Graph/Charts */}
          <Grid item xs={12} md={8}>
            <Paper className="p-4 shadow-lg bg-white">
              <Typography variant="h6" className="mb-4">
                Sales Overview
              </Typography>
              {/* Placeholder for a chart */}
              <Box className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <Typography variant="h5" className="text-gray-500">
               <SalesBarChart/>
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={4}>
            <Paper className="p-4 shadow-lg bg-white">
              <Typography variant="h6" className="mb-4">
                Recent Activities
              </Typography>
              <ul className="list-none">
                <li className="mb-2">
                  <Typography variant="body1">
                    <span className="font-bold">User1</span> registered for <span className="font-bold">Event1</span>.
                  </Typography>
                </li>
                <li className="mb-2">
                  <Typography variant="body1">
                    <span className="font-bold">User2</span> bought a ticket for <span className="font-bold">Event2</span>.
                  </Typography>
                </li>
                <li className="mb-2">
                  <Typography variant="body1">
                    <span className="font-bold">User3</span> commented on <span className="font-bold">Event3</span>.
                  </Typography>
                </li>
                <li className="mb-2">
                  <Typography variant="body1">
                    <span className="font-bold">User4</span> updated the details of <span className="font-bold">Event4</span>.
                  </Typography>
                </li>
              </ul>
            </Paper>
          </Grid>

          
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
