
const Event = require('../models/Event');
const User= require('../models/User');


exports.createEvent = async (req, res) => {
  try {

    const event = new Event(req.body);
    const userId = event.organizer_id
    const user = await User.findById(userId)
    user.role = "Organizer"
    await user.save()
    event.ticket_quantity_left = event.ticket_quantity
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({status:"Complete"}).populate('organizer_id', 'first_name last_name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getUpcomingEvents = async (req, res) => {
  try {
    const currentDate = new Date();
    const events = await Event.find({ 
      status: "Approved",
    })
    .populate('organizer_id', 'first_name last_name email')
    .sort({ date_from: 1 }) // Sort by the event start date
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrganizerEvents = async (req, res) => {
  try {
    const organizerId = req.params.organizerId;
    
    const events = await Event.find({ organizer_id: organizerId }).populate('organizer_id', 'first_name last_name email');
    if (!events || events.length === 0) {
      return res.status(404).json({ error: 'No events found for this organizer' });
    }

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer_id', 'first_name last_name email');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }}

exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if a new banner is provided
    if (req.file) {
      // First delete the existing banner
      const bannerPath = path.join(__dirname, '..', 'uploads', 'banners', path.basename(event.banner));
      fs.unlink(bannerPath, (err) => {
        if (err) {
          console.log('Failed to delete old banner', err);
        }
      });

      // Update with the new banner URL
      event.banner = `${apiUrl}/uploads/${req.file.filename}`;
    }

    // Update the other event fields
    Object.assign(event, req.body);
    
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
