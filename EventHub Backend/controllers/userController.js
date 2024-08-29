const User = require('../models/User');
const bcrypt = require('bcrypt'); 




exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    console.log(req.body)
    const updates = req.body;

    // If password is being updated, hash it before saving
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    // Find the user by ID and update the details
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');

    // If user not found, return 404
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Return the updated user data, excluding the password
    res.json(user);
  } catch (error) {
    // Return a 400 status code with the error message if an error occurs
    res.status(400).json({ error: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
