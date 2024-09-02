
const express = require('express');
const mainRouter = express.Router();
const publicRoutes = require('./publicRouter');
const protectedRoutes = require('./protectedRouter');
const {authMiddleware} = require("../middleware/authMiddleware")

mainRouter.use('/protected',authMiddleware, protectedRoutes);
mainRouter.use('/public', publicRoutes);


mainRouter.use('*', (req, res) => {
    res.status(404).json({ error: 'URL not found' });
  });
module.exports = mainRouter;
