
const express = require('express');
const userRouter = require('./apiRoutes/userRoutes')
const eventRouter = require('./apiRoutes/eventRoutes')
const ticketRouter = require('./apiRoutes/ticketRoutes')
const mainRouter = express.Router();
const analyticsRoutes = require('./apiRoutes/analyticsRoutes');
const paymentRoutes = require('./apiRoutes/paymentRoutes');
const registrationRoutes = require('./apiRoutes/registrationRoutes');
const venueRoutes = require('./apiRoutes/venueRoutes');

mainRouter.use('/users', userRouter);
mainRouter.use('/events', eventRouter);
mainRouter.use('/tickets', ticketRouter);
mainRouter.use('/analytics', analyticsRoutes);
mainRouter.use('/payments', paymentRoutes);
mainRouter.use('/registrations', registrationRoutes);
mainRouter.use('/venues', venueRoutes);

mainRouter.use('*', (req, res) => {
    res.status(404).json({ error: 'URL not found' });
  });
module.exports = mainRouter;
