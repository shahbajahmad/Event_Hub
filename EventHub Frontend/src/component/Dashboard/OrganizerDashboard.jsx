import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MiniDashboard from './MiniDashboard';
import EventRow from './EventRow';
import TableLayout from './TableLayout';
import { fetchOrganizerEvents } from '../../service/features/eventSlice';

export default function OrganizerDashboard() {
  const { organizerEvents, error, isLoading } = useSelector((state) => state.event);
  const { user:{_id} } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Fetch analytics data using the Fetch API
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/protected/analytics/organizer/${_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Pass the token here
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
    dispatch(fetchOrganizerEvents(_id))
  }, []);

  return (
    <div className="min-h-screen p-4">
      <Grid container spacing={3}>
        {/* Mini Dashboard for Key Stats */}
        <Grid item xs={12}>
          {loadingAnalytics ? (
            <CircularProgress />
          ) : analytics ? (
            <MiniDashboard
              noOfEvents={analytics.total_events}
              totalSales={analytics.total_paid_sales}
              soldTickets={analytics.sold_tickets}
              freeRegistrations={analytics.free_registrations}
            />
          ) : (
            <Typography variant="h6">No analytics available</Typography>
          )}
        </Grid>

        {/* Event Organized */}
        <Grid item xs={12}>
          <Typography variant="h5" className="font-light mb-4">Lifetime Events</Typography>
          <Paper elevation={3} className="p-4 overflow-auto">
            <TableLayout />
            <Divider className="mb-4" />
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              <Typography>No events available.</Typography>
            ) : (
              organizerEvents.map(event => <EventRow key={event._id} event={event} />)
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
