
import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditEvent from '../EditEvent';
import { addEditEvent } from '../../../service/features/eventSlice';

export default function EditEventsPage() {
  const { editEvent } = useSelector((state) => state.event);
  const dispatch = useDispatch()
 
 
    
  return (
    <div className="min-h-screen p-4  ">
      <Grid container spacing={3}>
        {/* Overview */}
     {editEvent?   <EditEvent/>
:<Typography className='text-center' color={"red"} variant="h2">Kindly Select any Event to Edit</Typography>}
      </Grid>
    </div>
  );
}
