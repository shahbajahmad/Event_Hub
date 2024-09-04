import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
export default function MiniDashboard({noOfEvents=0,totalSales=0,soldTickes=0}) {
  return (
<Grid container spacing={3} sx={{ padding: 2 }} className='flex items-center justify-center'>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
           
            sx={{
              padding: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
           <div ><Typography variant="h6"  className=" font-medium ">EVENTS</Typography>
           <Typography variant="h5" >{noOfEvents}</Typography></div> 
             <div className="flex justify-center items-center h-12 w-12 rounded-full bg-orange-100"> <CalendarMonthIcon color="error" /></div>
         
          </Paper>
        </Grid>

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
               <div ><Typography variant="h6" className=" font-medium">TOTAL SALES</Typography>
           <Typography variant="h5" >{totalSales}</Typography></div> 
             <div className="flex justify-center items-center h-12 w-12 rounded-full bg-purple-100">   <ShoppingCartIcon color="secondary" /></div>
         
         
          
         
          </Paper>
        </Grid>

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
       
            <div ><Typography variant="h6" className=" font-medium">SOLD TICKET </Typography>
          <Typography variant="h5" >{soldTickes}</Typography></div> 
            <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-100">     <ConfirmationNumberIcon color="primary" /></div>
        
          </Paper>
        </Grid>

      </Grid>   
  )
}
