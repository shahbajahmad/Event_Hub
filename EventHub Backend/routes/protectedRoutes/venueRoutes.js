// routes/venueRoutes.js
const express = require('express');
const {
  createVenue,
  getVenues,
  getVenue,
  updateVenue,
  deleteVenue,
} = require('../../controllers/venueController');

const router = express.Router();

router.post('/', createVenue);
router.get('/', getVenues);
router.get('/:id', getVenue);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);

module.exports = router;
