const express = require('express');
const multer = require('multer');
const router = express.Router();
const fileSizeLimit = parseInt(process.env.FILE_SIZE, 10); // Assuming the FILE_SIZE is in bytes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);  // Create a unique filename for the uploaded file
  }
});

const upload = multer({ storage });

router.post('/', upload.single('banner'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Manually check the file size
    if (req.file.size > fileSizeLimit) {
      // Remove the uploaded file if it exceeds the limit
      const fs = require('fs');
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Failed to delete oversized file:', err);
        }
      });
      return res.status(400).json({ error: `File size exceeds the limit of ${fileSizeLimit / 1000000}MB.` });
    }
  
    res.json({ url: `/uploads/${req.file.filename}` });
  } catch (err) {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      return res.status(400).json({ error: err.message });
    } else {
      // Handle other errors
      return res.status(500).json({ error: 'An error occurred while uploading the file' });
    }
  }
});

module.exports = router;
