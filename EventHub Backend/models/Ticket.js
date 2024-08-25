const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  purchased_at: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
