import React from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Paper,
  Checkbox,
  FormGroup,
  Divider,
} from '@mui/material';

export default function CreateEvent() {
  return (
    <Paper elevation={3} sx={{ maxWidth: '1200px', mx: 'auto', p: 4, mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create An Event
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Create an event to enjoy all the services
      </Typography>

      {/* Event Image Banner */}
      <div className=" w-full overflow-y-hidden h-[100px] sm:h-[200px] relative my-2 sm:my-8">      <img
        src="/images/event-banner.jpg"
        alt="Event Banner"
        className='absolute -bottom-10 sm:-bottom-32 left-0 w-full object-cover'
        style={{ width: '100%', borderRadius: '8px', marginBottom: '24px' }}
      />
</div>

      <Grid container spacing={4} className='p-2 sm:p-8' >
        {/* Left Column */}
        <Grid item xs={12} md={5}>
          <FormLabel component="legend">Event Type</FormLabel>
          <RadioGroup row aria-label="event-type" name="event-type" defaultValue="Physical">
            <FormControlLabel value="Physical" control={<Radio />} label="Physical" />
            <FormControlLabel value="Online" control={<Radio />} label="Online" />
            <FormControlLabel value="Hybrid" control={<Radio />} label="Hybrid" />
          </RadioGroup>

          <FormLabel component="legend" sx={{ mt: 3 }}>Entry Type</FormLabel>
          <RadioGroup row aria-label="entry-type" name="entry-type" defaultValue="Free">
            <FormControlLabel value="Free" control={<Radio />} label="Free" />
            <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
          </RadioGroup>

          <TextField
            fullWidth
            label="Event Name"
            required
            margin="normal"
            placeholder="Enter Event Name"
          />

          <TextField
            fullWidth
            label="Date From - Date To"
            required
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            label="Select Location"
            required
            margin="normal"
            placeholder="Enter Location"
          />

          <TextField
            fullWidth
            label="Full Address"
            required
            margin="normal"
            placeholder="Enter Full Address"
          />

          <TextField
            fullWidth
            label="Contact No."
            required
            margin="normal"
            placeholder="Enter Contact Number"
            type="tel"
          />

          <TextField
            fullWidth
            label="Event Description"
            required
            margin="normal"
            placeholder="Enter Event Description Here..."
            multiline
            rows={4}
          />
        </Grid>

        {/* Vertical Divider */}
        <Divider orientation="vertical" flexItem className='ms-10' />

        {/* Right Column */}
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Upload Banner"
            margin="normal"
            type="file"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            label="Terms and Conditions"
            margin="normal"
            placeholder="Add the Terms and Conditions for the Event"
          />

          <TextField
            fullWidth
            label="Add Video URL"
            margin="normal"
            placeholder="Add Video URL"
          />

          <TextField
            fullWidth
            label="Facebook"
            margin="normal"
            placeholder="Account Link"
          />

          <TextField
            fullWidth
            label="Instagram"
            margin="normal"
            placeholder="Account Link"
          />

          <TextField
            fullWidth
            label="LinkedIn"
            margin="normal"
            placeholder="Account Link"
          />

          <TextField
            fullWidth
            label="Website"
            margin="normal"
            placeholder="Website Link"
          />

          <FormLabel component="legend" sx={{ mt: 3 }}>Tags</FormLabel>
          <FormGroup row>
            <FormControlLabel control={<Checkbox />} label="Technology" />
            <FormControlLabel control={<Checkbox />} label="Sports" />
            <FormControlLabel control={<Checkbox />} label="Health" />
            <FormControlLabel control={<Checkbox />} label="Media" />
            <FormControlLabel control={<Checkbox />} label="Fitness" />
          </FormGroup>
        </Grid>
      </Grid>

      <Grid container className=' justify-end' sx={{ mt: 4 }}>
      
        <Button variant="contained" color="primary">Create Event</Button>
      </Grid>
    </Paper>
  );
}
