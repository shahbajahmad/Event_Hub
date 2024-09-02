
const express = require('express');
const eventRouter = require('./publicRoutes/eventPublicRoutes')

const publicRoutes = express.Router();

publicRoutes.use('/events', eventRouter);


publicRoutes.use('*', (req, res) => {
    res.status(404).json({ error: 'URL not found' });
  });
module.exports = publicRoutes;
