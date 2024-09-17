// server/routes/event.js or appropriate router file

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Event = require("../../models/Event")
// Delete banner route
router.delete('/:event_id', async (req, res) => {
  try {
    const eventId = req.params.event_id;


    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

   
    const bannerPath = path.join(__dirname, '..', '..', "public",'uploads', path.basename(event.banner));
    
    // Delete the banner file
    fs.unlink(bannerPath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to delete banner file',err });
      }
      res.status(200).json({ message: 'Banner deleted successfully' });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
