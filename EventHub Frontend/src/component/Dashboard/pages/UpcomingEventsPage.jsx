import React from 'react';
import { Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import EventRow from '../EventRow';
import TableLayout from '../TableLayout';

export default function UpcomingEventsPage() {
  const { organizerEvents, error, isLoading } = useSelector((state) => state.event);

  // Get the current date
  const currentDate = new Date();

  // Filter only the events where the event date (date_from) is in the future
  const upcomingEvents = organizerEvents?.filter(event => new Date(event.date_from) > currentDate && event.status === "Approved");

  return (
    <div className="min-h-screen p-4">
      <Grid container spacing={3}>
        {/* Upcoming Events */}  
        <Grid item xs={12}>
          <Typography variant="h5" className="font-light mb-4">Upcoming Events</Typography>
          <Paper elevation={3} className="p-4 overflow-auto">
            <TableLayout />
            <Divider className="mb-4" />
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              <Typography>No events available.</Typography>
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => <EventRow key={event._id} event={event} />)
            ) : (
              <Typography>No upcoming events found.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
