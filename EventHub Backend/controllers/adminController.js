const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register Agent by Admin
exports.registerAgent = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new agent
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const agent = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: 'Agent', 
    });

    // Save the agent
    await agent.save();

    res.status(201).json({ message: 'Agent registered successfully', agent });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
