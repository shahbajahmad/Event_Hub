import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import PieChartIcon from '@mui/icons-material/PieChart';

export default function MiniDashboard({ noOfEvents = 0, totalSales = 0, soldTickets = 0, freeRegistrations = 0, ticketAvailability = "0%" }) {
  return (
    <Grid container spacing={3} sx={{ padding: 2 }} className='flex items-center justify-center'>
      {/* Total Events */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography variant="h6" className="font-medium">EVENTS</Typography>
            <Typography variant="h5">{noOfEvents}</Typography>
          </div>
          <div className="flex justify-center items-center h-12 w-12 rounded-full bg-orange-100">
            <CalendarMonthIcon color="error" />
          </div>
        </Paper>
      </Grid>

      {/* Sold Tickets */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography variant="h6" className="font-medium">SOLD TICKETS</Typography>
            <Typography variant="h5">{soldTickets}</Typography>
          </div>
          <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-100">
            <ConfirmationNumberIcon color="primary" />
          </div>
        </Paper>
      </Grid>



      {/* Free Registrations */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography variant="h6" className="font-medium">FREE REGISTRATIONS</Typography>
            <Typography variant="h5">{freeRegistrations}</Typography>
          </div>
          <div className="flex justify-center items-center h-12 w-12 rounded-full bg-purple-100">
            <PeopleIcon color="primary" />
          </div>
        </Paper>
      </Grid>

   
    </Grid>
  );
}
