
const express = require('express');
const userRouter = require('./protectedRoutes/userRoutes')
const eventRouter = require('./protectedRoutes/eventRoutes')
const ticketRouter = require('./protectedRoutes/ticketRoutes')
const mainRouter = express.Router();
const analyticsRoutes = require('./protectedRoutes/analyticsRoutes');

mainRouter.use('/users', userRouter);
mainRouter.use('/events', eventRouter);
mainRouter.use('/tickets', ticketRouter);
mainRouter.use('/analytics', analyticsRoutes);



mainRouter.use('*', (req, res) => {
    res.status(404).json({ error: 'URL not found' });
  });
module.exports = mainRouter;
