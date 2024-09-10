// routes/eventRoutes.js
const express = require('express');
const {
  createEvent,
  updateEvent,
  deleteEvent,getOrganizerEvents,
} = require('../../controllers/eventController');


const router = express.Router();



router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get('/organizer/:organizerId', getOrganizerEvents);  // Add this route to get events by organizer

module.exports = router;
