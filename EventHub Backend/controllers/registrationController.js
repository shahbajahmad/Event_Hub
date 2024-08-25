const Registration = require('../models/Registration');

exports.createRegistration = async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('user_id', 'first_name last_name email')
      .populate('event_id', 'name date_from location');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('user_id', 'first_name last_name email')
      .populate('event_id', 'name date_from location');
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user_id', 'first_name last_name email')
      .populate('event_id', 'name date_from location');
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.json({ message: 'Registration deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
