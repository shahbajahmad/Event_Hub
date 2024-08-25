import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from '@mui/material';
import CountdownTimer from '../component/CountdownTimer'; // Assuming the CountdownTimer component is defined

export default function EventPage() {
  const targetDate = '2024-09-01T10:30:00';

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, p: 2 }}>
        <Typography variant="h4" fontWeight={"bold"} className='text-center mb-10'>
     Event <span className="text-orange-400 font-extrabold">Details </span>
    </Typography>
   
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Description
            </Typography>
            <Typography variant="h6" gutterBottom>
              Welcome to the Kubernetes Community Day Lahore 2024
            </Typography>
            <Typography variant="body1" paragraph>
              Step into the future of cloud-native technology at K8s Community Day Lahore, a transformative experience centered around Kubernetes and cutting-edge innovations. As technology evolves, the significance of cloud-native computing and Kubernetes in shaping IT infrastructure and application development has never been more profound. This hybrid event is scheduled for both online and on-site participation.
            </Typography>
            <Typography variant="subtitle1" color="secondary" sx={{ fontWeight: 'bold' }}>
              Event Highlights
            </Typography>
            <Typography variant="body2" paragraph>
              In-Depth Talks and Workshops<br/>
              Networking Opportunities<br/>
              Hands-On Learning<br/>
              Open-Source Exploration<br/>
              Renowned Speakers<br/>
              Exhibitor Showcase<br/>
              Interactive Q&A
            </Typography>

            {/* Countdown */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Fun begins in
            </Typography>
            <CountdownTimer targetDate={targetDate} />

            {/* Tickets Section */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Tickets
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Early Bird Discount</TableCell>
                    <TableCell>Final Price</TableCell>
                    <TableCell>Require Approval</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Kubernetes Community Day Lahore</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Terms & Conditions */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Terms & Conditions
            </Typography>
            <Typography variant="body2" paragraph>
              We are committed to making the participation of all those involved in this event an experience free from harassment of any kind. Kubernetes Community Days are governed by the <Link href="https://events.linuxfoundation.org/code-of-conduct/" target="_blank" rel="noopener">Linux Foundation Code of Conduct</Link> available at:
            </Typography>
            <Link href="https://events.linuxfoundation.org/code-of-conduct/" target="_blank" rel="noopener">
              https://events.linuxfoundation.org/code-of-conduct/
            </Link>
            <Typography variant="body2" paragraph>
              Stay Connected: Stay informed about event details, speaker announcements, and other updates by following us on social media.
            </Typography>
            <Typography variant="body2" paragraph>
              Kubernetes Community Day Lahore is your gateway to the future of cloud-native technology. Join us for an enlightening day of learning, networking, and inspiration. We eagerly anticipate your presence at this landmark event.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Severability:</strong> If any provision of these terms and conditions is deemed invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Entire Agreement:</strong> These terms and conditions constitute the entire agreement between the parties regarding the Event/Expo and supersede any prior agreements, understandings, or representations, whether written or oral.
            </Typography>
            <Typography variant="body2">
              By registering for the event, participants acknowledge that they have read, understood, and agreed to abide by these terms and conditions with full effect.
            </Typography>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={5} className=' sticky top-0'>
          <Paper elevation={3} sx={{ p: 3 }}>
            <img
              src="/images/event-banner.jpg" // Replace with the actual banner image path
              alt="Event Banner"
              style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
            />
            <Typography variant="h5" gutterBottom>
              KCD | Kubernetes Community Day Lahore 2024
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              By Syed Asad Raza
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Starts on:</strong> September 1, 2024 (10:30 AM)
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Ends on:</strong> September 1, 2024 (3:00 PM)
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Location:</strong> University of Central Punjab | UCP, Khayaban-e-Jinnah Road, Johar Town, Lahore
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Category:</strong> Technology
            </Typography>
            <Typography variant="body2" color="green" gutterBottom>
              <strong>Free (Physical)</strong>
            </Typography>
            <Button variant="contained" color="warning"  sx={{ mt: 2 }}>
              Buy Tickets
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
