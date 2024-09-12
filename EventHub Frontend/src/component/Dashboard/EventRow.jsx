import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function EventRow({ event }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderBottom="1px solid #e0e0e0">
      <Box display="flex" alignItems="center" width="25%"> {/* Consistent width */}
        <img
          src={event.banner}
          alt={event.name}
          style={{ marginRight: 16, width: 50, height: 50, objectFit: 'contain' }}
        />
        <Typography variant="body1" fontWeight="bold">
          {event.name}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" width="25%"> {/* Consistent width */}
        <Typography variant="body2">{event.location}</Typography>
      </Box>
      <Box display="flex" alignItems="center" width="15%"> {/* Adjust width */}
        <Typography variant="body2">{new Date(event.date_from).toLocaleDateString()}</Typography>
      </Box>
      <Box display="flex" alignItems="center" width="15%"> {/* Adjust width */}
        <Typography variant="body2">
          {event.entry_type === 'Free' ? 'Free' : `$${event.ticket_price}`}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" > {/* Adjust width */}
        <Link to={`/event/${event._id}`}>
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
