const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional folder name where files will be stored in Cloudinary
    public_id: (req, file) => {
      const name = path.parse(file.originalname).name; // Get the filename without extension
      return `${Date.now()}-${name}`; // Use timestamp and filename, without the extension
    },
    format: null, // Make sure Cloudinary does not add an extension (keeps it as it is)
  }
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage });

// Route for file uploads
router.post('/', upload.single('banner'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Use req.file.secure_url to get the full Cloudinary URL
    res.json({
      url: req.file.secure_url, // Full Cloudinary URL
      public_id: req.file.public_id, // Cloudinary's public ID for this file
    });
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

module.exports = router;
