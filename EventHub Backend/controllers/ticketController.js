const Ticket = require('../models/Ticket');
const Event = require("../models/Event")
exports.createTicket = async (req, res) => {
  try {
    // Create the ticket but don't save yet
    const ticket = new Ticket(req.body);
    const {event_id,user_id} = ticket 
    const existingTicket = await Ticket.findOne({ event_id, user_id });

    if (existingTicket) {
      return res.status(400).json({ message: "You have already purchased a ticket for this event." });
    }
    // Fetch the event using findById
    const event = await Event.findById(ticket.event_id);

    // Check if tickets are available
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    if (event.ticket_quantity_left <= 0) {
      return res.status(400).json({ error: 'No tickets available for this event' });
    }

    // Decrement the ticket quantity left
    event.ticket_quantity_left -= 1;

    // Save the ticket and event atomically
    await ticket.save();
    await event.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTicketsByUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    
    // Find the user's tickets and populate the related event and user details
    const tickets = await Ticket.find({ user_id: userId })
      .populate('event_id', 'name date_from location banner')
      .populate('user_id', 'first_name last_name email');

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ error: 'No tickets found for this user' });
    }

    const currentDate = new Date();

    // Filter out tickets for events that have already passed
    const upcomingTickets = tickets.filter(ticket => new Date(ticket.event_id.date_from) > currentDate);

    // Sort the remaining tickets by event date (date_from) in ascending order
    upcomingTickets.sort((a, b) => new Date(a.event_id.date_from) - new Date(b.event_id.date_from));

    res.json(upcomingTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlreadyTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('event_id', 'name date_from location')
      .populate('user_id', 'first_name last_name email');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('event_id', 'name date_from location')
      .populate('user_id', 'first_name last_name email');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('event_id', 'name date_from location')
      .populate('user_id', 'first_name last_name email');
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('event_id', 'name date_from location')
      .populate('user_id', 'first_name last_name email');
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json({ message: 'Ticket deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
