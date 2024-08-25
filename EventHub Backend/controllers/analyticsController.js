const Analytics = require('../models/Analytics');

// Controller function to update analytics data
exports.updateAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.calculateAndUpdate();
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get the latest analytics data
exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findOne().sort({ created_at: -1 });
    if (!analytics) {
      return res.status(404).json({ message: 'Analytics data not found' });
    }
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
