import React from 'react';
import { Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import EventRow from './EventRow';
import TableLayout from './TableLayout';

export default function OrganizerDashboard() {
  const { organizerEvents, error, isLoading } = useSelector((state) => state.event);

  return (
    <div className="min-h-screen p-4">
      <Grid container spacing={3}>
        {/* Overview */}
   
        {/* Event Organized */}
        <Grid item xs={12}>
          <Typography variant="h5" className="font-light mb-4">Events Organized</Typography>
          <Paper elevation={3} className="p-4 overflow-auto" >
          <TableLayout/>
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
