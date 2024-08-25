const Venue = require('../models/Venue');

exports.createVenue = async (req, res) => {
  try {
    const venue = new Venue(req.body);
    await venue.save();
    res.status(201).json(venue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVenues = async (req, res) => {
  try {
    const venues = await Venue.find().populate('events', 'name date_from location');
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate('events', 'name date_from location');
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('events', 'name date_from location');
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json({ message: 'Venue deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
