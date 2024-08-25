
const express = require('express');
const userRouter = require('./subRoutes/userRoutes')
const eventRouter = require('./subRoutes/eventRoutes')
const ticketRouter = require('./subRoutes/ticketRoutes')
const mainRouter = express.Router();
const analyticsRoutes = require('./subRoutes/analyticsRoutes');
const paymentRoutes = require('./subRoutes/paymentRoutes');
const registrationRoutes = require('./subRoutes/registrationRoutes');
const venueRoutes = require('./subRoutes/venueRoutes');

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
