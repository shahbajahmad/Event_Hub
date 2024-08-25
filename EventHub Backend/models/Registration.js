const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  registered_at: { type: Date, default: Date.now },
});

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
