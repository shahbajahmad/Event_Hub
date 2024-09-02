
const express = require('express');
const userRouter = require('./protectedRoutes/userRoutes')
const eventRouter = require('./protectedRoutes/eventRoutes')
const ticketRouter = require('./protectedRoutes/ticketRoutes')
const mainRouter = express.Router();
const analyticsRoutes = require('./protectedRoutes/analyticsRoutes');
const paymentRoutes = require('./protectedRoutes/paymentRoutes');
const registrationRoutes = require('./protectedRoutes/registrationRoutes');
const venueRoutes = require('./protectedRoutes/venueRoutes');

mainRouter.use('/users', userRouter);
mainRouter.use('/events', eventRouter);
mainRouter.use('/tickets', ticketRouter);
mainRouter.use('/analytics', analyticsRoutes);
mainRouter.use('/payments', paymentRoutes);
mainRouter.use('/registrations', registrationRoutes);
mainRouter.use('/venues', venueRoutes);
mainRouter.use('/protected', venueRoutes);
mainRouter.use('/public', venueRoutes);


mainRouter.use('*', (req, res) => {
    res.status(404).json({ error: 'URL not found' });
  });
module.exports = mainRouter;
