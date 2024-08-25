const express = require('express');
const {
  updateAnalytics,
  getAnalytics
} = require('../../controllers/analyticsController');

const router = express.Router();

// Route to update analytics data
router.get('/update', updateAnalytics);

// Route to get the latest analytics data
router.get('/', getAnalytics);

module.exports = router;
