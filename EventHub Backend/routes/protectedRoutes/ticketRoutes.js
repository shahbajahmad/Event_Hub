const express = require('express');
const router = express.Router();
const ticketController = require('../../controllers/ticketController');

// Route to create a new ticket
router.post('/', ticketController.createTicket);

// Route to get all tickets
router.get('/', ticketController.getTickets);

// Route to get a single ticket by ID
router.get('/:id', ticketController.getTicket);

// Route to get tickets by user ID
router.get('/user/:user_id', ticketController.getTicketsByUser);

// Route to update a ticket by ID
router.put('/:id', ticketController.updateTicket);

// Route to delete a ticket by ID
router.delete('/:id', ticketController.deleteTicket);


module.exports = router;
