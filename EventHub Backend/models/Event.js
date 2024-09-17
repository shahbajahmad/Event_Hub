const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event_type: { type: String, enum: ['Physical', 'Online', 'Hybrid'], required: true },
  entry_type: { type: String, enum: ['Free', 'Paid'], required: true },
  ticket_quantity: { type: Number },
  ticket_price: { type: Number },
  ticket_quantity_left: { type: Number ,default:0},
  name: { type: String, required: true },
  date_from: { type: Date, required: true },
  date_to: { type: Date },
  location: { type: String, required: true },
  address: { type: String },
  contact_number: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String }, // URL of the uploaded banner image
  terms_conditions: { type: String },
  video_url: { type: String },
  
  status: { 
    type: String, 
    enum: ['In Process', 'Approved', 'Reject', 'Complete'], 
    default: 'In Process' 
  },
  social_links: {
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    website: { type: String }
  },
  tags: [{ type: String }], // Array of tags like Technology, Sports, etc.
  highlights: [{ type: String }], // Array of strings for event highlights
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
