import React from 'react';
import {
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
  Divider,
  IconButton,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {deepPurple } from '@mui/material/colors';
export default function ProfilePage() {
  return (
    <Box sx={{ maxWidth: '900px', mx: 'auto', mt: 4, p: 2 }}>
      {/* Profile Header */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Box
          sx={{
            backgroundImage: 'url(/images/profile-banner.webp)', // Use your banner image here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '150px',
            borderRadius: '8px 8px 0 0',
          }}
        />
        <Box sx={{ textAlign: 'center', mt: '-50px' }}>
          <Avatar
            alt="Profile Picture"
            // Use your profile picture here
            sx={{ width: 100, height: 100, mx: 'auto', border: '4px solid white'  ,bgcolor: deepPurple[500] }}
          />
          <Typography variant="h5" sx={{ mt: 2 }} className=' capitalize'>
            bilal naeem <span style={{ color: '#00f' }}>•</span> {/* You can replace the dot with a verified icon if needed */}
          </Typography>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">0</Typography>
              <Typography variant="body2" color="textSecondary">
                Events Attended
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">0.00</Typography>
              <Typography variant="body2" color="textSecondary">
                Total Spending on Tickets (Rupees)
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Personal Info Section */}
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Personal Info</Typography>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Name:</Typography>
            <Typography variant="body1">bilal naeem</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Email:</Typography>
            <Typography variant="body1">bn.4389@gmail.com</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">City:</Typography>
            <Typography variant="body1">-</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Gender:</Typography>
            <Typography variant="body1">-</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Ticket Preview Section */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Ticket Preview
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {/* Add Ticket Preview Content Here */}
        <Box sx={{ textAlign: 'right' }}>
          <Button endIcon={<EditIcon />}>scroll</Button>
        </Box>
      </Paper>
    </Box>
  );
}
