const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to check if token is valid
router.get('/', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token expired or invalid', expired: true });
    }

    // Token is valid
    res.status(200).json({ message: 'Token is valid', expired: false });
  });
});

module.exports = router;
