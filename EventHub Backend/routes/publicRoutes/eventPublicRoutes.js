// routes/eventRoutes.js
const express = require('express');
const {
  getEvents,
  getEvent,
  getUpcomingEvents
} = require('../../controllers/eventController');


const router = express.Router();

router.get('/', getEvents);
router.get('/upcoming', getUpcomingEvents);

router.get('/:id', getEvent);

module.exports = router;
