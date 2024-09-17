const express = require('express');
const router = express.Router();
const {

  getUsers,
  getUser,

  deleteUser,
} = require('../controllers/userController');
const {
  deleteEvent
} = require('../controllers/eventController');

const {
  updateEventStatus,
  getAllEvents
} = require('../controllers/adminController');


  // Route to get all users (admin only)
  router.get('/users', getUsers);
  // Route to get details of a specific user (admin only)
  router.get('/users/:id',getUser );
 
  // Route to delete a user (admin only)
  router.delete('/users/:id',deleteUser );
  
  // Route to get all events (admin only)
  router.get('/events', getAllEvents);
  
  // Route to delete an event (admin only)
  router.delete('/events/:id', deleteEvent);
  router.post('/events/:id/status', updateEventStatus);
module.exports = router;