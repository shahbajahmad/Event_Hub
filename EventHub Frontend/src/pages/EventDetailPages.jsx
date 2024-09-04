import React, { useEffect, useState } from 'react';
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
  Skeleton,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import CountdownTimer from '../component/CountdownTimer';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../service/features/modalSlice';
import { showSnackbar } from '../service/features/snackbarSlice';
import Confetti from 'react-confetti';

export default function EventPage() {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false); // State for showing confetti
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch the event data based on the ID
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/public/events/${id}`);
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBuyTicket = async () => {
    if (!token) {
      // If the user is not logged in, open the login modal and show a snackbar message
      dispatch(openModal());
      dispatch(showSnackbar({ message: "Please log in to buy the ticket.", severity: "error" }));
    } else {
      try {
        // If the user is logged in, proceed with ticket purchase
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/protected/tickets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in headers
          },
          body: JSON.stringify({
            event_id: event._id, // Send the event ID to associate the ticket with the event
            user_id: user._id, // You will need to replace this with the actual logged-in user ID from state
            price: event.ticket_price ? event.ticket_price : 0, // Set the ticket price, 0 if it's free
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Ticket purchase failed");
        }

        // If successful, show a success message
        dispatch(showSnackbar({ message: "Ticket purchased successfully!", severity: "success" }));

        // Show confetti for 5 seconds
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);

        // After successful purchase, refetch the event to update ticket_quantity_left
        const updatedEvent = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/public/events/${id}`);
        const updatedData = await updatedEvent.json();
        setEvent(updatedData); // Update the state with the updated event data
      } catch (error) {
        // Handle any errors during the purchase process
        dispatch(showSnackbar({ message: error.message || "Ticket purchase failed", severity: "error" }));
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, p: 2 }}>
        <Typography variant="h4" fontWeight={"bold"} className='text-center mb-10'>
          Event <span className="text-orange-400 font-extrabold">Details</span>
        </Typography>
        {/* Loading Skeleton */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Skeleton variant="rectangular" height={600} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, p: 2 }}>
        <Typography variant="h4" fontWeight={"bold"} className='text-center mb-10'>
          Event <span className="text-orange-400 font-extrabold">Details</span>
        </Typography>
        <Typography variant="h4" color="error" textAlign="center">
          Event not found
        </Typography>
      </Box>
    );
  }

  const targetDate = event.date_from; // Use event's date_from as the countdown target date

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, p: 2 }}>
      {/* Confetti will show only if showConfetti is true */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      <Typography variant="h4" fontWeight={"bold"} className='text-center mb-10'>
        Event <span className="text-orange-400 font-extrabold">Details</span>
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Description
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              {event.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {event.description}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Event Highlights
            </Typography>
            <div variant="body2" paragraph>
              {event.highlights.join(', ').split(',').map((highlight, index) => (
                <React.Fragment key={index}>
                  <li className='my-1'>{highlight.trim()}</li>
                </React.Fragment>
              ))}
            </div>

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
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.ticket_price ? `$${event.ticket_price}` : 'Free'}</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>{event.ticket_price ? `$${event.ticket_price}` : 'Free'}</TableCell>
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
              {event.terms_conditions}
            </Typography>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={5} className=' sticky top-0'>
          <Paper elevation={3} sx={{ p: 3 }}>
            <img
              src={event.banner}
              alt="Event Banner"
              style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
            />
            <Typography variant="h5" gutterBottom>
              {event.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              By {event.organizer_id.first_name} {event.organizer_id.last_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Starts on:</strong> {new Date(event.date_from).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Ends on:</strong> {event.date_to ? new Date(event.date_to).toLocaleString() : 'N/A'}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Location:</strong> {event.location}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Category:</strong> {event.tags.join(', ')}
            </Typography>
            <Typography variant="body2" color="green" className='text-xl' gutterBottom>
              <strong>{event.ticket_price ? `$${event.ticket_price}` : 'Free'} ({event.event_type})</strong>
            </Typography>
            <div className="flex justify-between items-center mt-5">
              <Button disabled={new Date(targetDate) < new Date()} variant="contained" color="warning" onClick={handleBuyTicket}>
                Buy Tickets
              </Button>
              <Typography variant="body2" gutterBottom>
                <strong>{event.ticket_quantity_left}/{event.ticket_quantity}</strong>
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
