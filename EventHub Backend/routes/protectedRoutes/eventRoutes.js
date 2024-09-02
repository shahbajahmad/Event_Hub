// routes/eventRoutes.js
const express = require('express');
const {
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../../controllers/eventController');


const router = express.Router();



router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
