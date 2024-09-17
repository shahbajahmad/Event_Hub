import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Divider, CircularProgress, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import EventRow from '../EventRow';
import TableLayout from '../TableLayout';
import { fetchAllEvents } from '../../../service/features/eventSlice';

export default function AllEventsPage() {
  const dispatch = useDispatch();
  const { adminEvents, error, isLoading } = useSelector((state) => state.event);
  
  // State for sorting by status
  const [selectedStatus, setSelectedStatus] = useState('');

  // Fetch all events when the component mounts
  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  // Handle status sorting
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Filter events based on selected status
  const filteredEvents = selectedStatus
    ? adminEvents.filter(event => event.status === selectedStatus)
    : adminEvents;

  return (
    <div className="min-h-screen p-4">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" className="font-light mb-4">All Events</Typography>
          
          {/* Add Radio Group for sorting by status */}
         
          <Paper elevation={3} className="p-4 overflow-auto">
          <RadioGroup
            row
            value={selectedStatus}
            onChange={handleStatusChange}
            aria-label="status-filter"
          >
            <FormControlLabel value="" control={<Radio />} label="All" />
            <FormControlLabel value="Complete" control={<Radio />} label="Complete" />
            <FormControlLabel value="Approved" control={<Radio />} label="Approved" />
            <FormControlLabel value="Reject" control={<Radio />} label="Rejected" />
            <FormControlLabel value="In Process" control={<Radio />} label="In Process" />
         

          </RadioGroup>
          
            <TableLayout />
            <Divider className="mb-4" />
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              <Typography>No events available.</Typography>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map(event => <EventRow key={event._id} event={event}/>)
            ) : (
              <Typography>No events found for the selected status.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
