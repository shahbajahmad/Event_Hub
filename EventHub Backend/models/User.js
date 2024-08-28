const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Organizer', 'Attendee', 'Admin'], default: 'Attendee' },
  city: { type: String, required: false }, // Optional city field
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
