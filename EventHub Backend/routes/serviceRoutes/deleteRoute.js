const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;  // Assuming you're using Cloudinary
const Event = require("../../models/Event");

// Delete banner route
router.delete('/:event_id', async (req, res) => {
  try {
    const eventId = req.params.event_id;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const bannerUrl = event.banner;  // The URL stored in the database

    // If using Cloudinary, remove the image by its public_id
    if (bannerUrl.includes('cloudinary')) {
      const publicId = path.basename(bannerUrl, path.extname(bannerUrl));  // Extract public ID from the URL
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Failed to delete banner from Cloudinary', error });
        }
        return res.status(200).json({ message: 'Banner deleted successfully', result });
      });
    } else {
      // For local storage, remove the file from the filesystem
      const bannerPath = path.join(__dirname, '..', '..', "public", 'uploads', path.basename(event.banner));
      
      fs.unlink(bannerPath, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to delete banner file', err });
        }
        res.status(200).json({ message: 'Banner deleted successfully' });
      });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
