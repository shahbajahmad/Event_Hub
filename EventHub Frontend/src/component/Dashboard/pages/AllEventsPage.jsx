import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import EventRow from '../EventRow';
import TableLayout from '../TableLayout';
import { fetchAllEvents } from '../../../service/features/eventSlice';

export default function AllEventsPage() {
  const dispatch = useDispatch();
  const { adminEvents, error, isLoading } = useSelector((state) => state.event);
  
  // Fetch pending events when the component mounts
  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-4">
      <Grid container spacing={3}>
        {/* Pending Events */}
        <Grid item xs={12}>
          <Typography variant="h5" className="font-light mb-4">All Events</Typography>
          <Paper elevation={3} className="p-4 overflow-auto">
            <TableLayout />
            <Divider className="mb-4" />
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              <Typography>No events available.</Typography>
            ) : adminEvents.length > 0 ? (
              adminEvents.map(event => <EventRow key={event._id} event={event}/>)
            ) : (
              <Typography>No pending events found.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
