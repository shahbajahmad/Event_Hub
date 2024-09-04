import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TicketPreview({ ticket }) {
  return (
    <Link to={`/event/${ticket.event_id._id}`} className=''>
    <Card className=' items-center justify-center hover:scale-y-105 transition-all flex flex-wrap mb-6' sx={{  boxShadow: 3, borderRadius: '8px' }}>
      <CardMedia
        component="img"
        sx={{ width: '250px', height: '100px', borderRadius: '0px' }}
        image={ticket.event_id.banner}
        alt={ticket.event_id.name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {ticket.event_id.name}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">
          <strong>Location:</strong> {ticket.event_id.location}
        </Typography>
        <Typography variant="body2">
          <strong>Date:</strong> {new Date(ticket.event_id.date_from).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          <strong>Price:</strong> {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
}
