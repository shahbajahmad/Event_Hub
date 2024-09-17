import React from 'react';
import { Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import EventRow from '../EventRow';
import TableLayout from '../TableLayout';

export default function OrganizerDashboard() {
  const { organizerEvents, error, isLoading } = useSelector((state) => state.event);

  // Filter only the events with status "Complete"

  const currentDate = new Date();
  // Filter only the events where the event date (date_from) is in the future


  const completedEvents = organizerEvents?.filter(event => (new Date(event.date_from) < currentDate)&&(event.status !== "In Process"));

  return (
    <div className="min-h-screen p-4">
      <Grid container spacing={3}>
        {/* Event Organized */}
        <Grid item xs={12}>
          <Typography variant="h5" className="font-light mb-4">Events Organized</Typography>
          <Paper elevation={3} className="p-4 overflow-auto">
            <TableLayout />
            <Divider className="mb-4" />
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              <Typography>No events available.</Typography>
            ) : completedEvents.length > 0 ? (
              completedEvents.map(event => <EventRow key={event._id} event={event} />)
            ) : (
              <Typography>No completed events found.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
