import React, { useEffect } from 'react';
import { Typography, Box, Divider, Grid, Paper, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrganizerEvents } from '../service/features/eventSlice';
import OrganizerEvent from './OrganizerEvent';

const OrganizerDashboard = ({upcomingEvents}) => {
  const dispatch = useDispatch();
  const {
    organizerEvents,
    error,
    isLoading,
  } = useSelector((state) => state.event);
  
  const { user: { _id } } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchOrganizerEvents(_id)); // Fetch organizer's tickets
  }, [dispatch, _id]);

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
                {isLoading ? <CircularProgress size={24} /> : upcomingEvents}
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
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Event Organized
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {isLoading ? (
                <CircularProgress />
              ) : error ? (
                <Typography variant="body1">No ticket available to preview</Typography>
              ) : organizerEvents && organizerEvents.length > 0 ? (
                organizerEvents.map((event) => (
                  <OrganizerEvent key={event._id} event={event} />
                ))
              ) : (
                <Typography variant="body1">No tickets available.</Typography>
              )}
            </Paper>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default OrganizerDashboard;
