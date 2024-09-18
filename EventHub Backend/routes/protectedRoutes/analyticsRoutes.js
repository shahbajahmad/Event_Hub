const express = require('express');
const {
  updateAnalytics,
  getAnalytics,
getOrganizerAnalytics,getAdminAnalytics
} = require('../../controllers/analyticsController');
const  {roleMiddleware}  = require('../../middleware/roleMiddleware');

const router = express.Router();

// Route to update analytics data
router.get('/update', updateAnalytics);
router.get('/organizer/:id', getOrganizerAnalytics);
router.get('/admin',roleMiddleware("Admin") ,getAdminAnalytics);

// Route to get the latest analytics data
router.get('/', getAnalytics);

module.exports = router;
