
const express = require('express');
const uploadRoute = require('./serviceRoutes/uploadRoute')
const deleteRoute = require('./serviceRoutes/deleteRoute')
const checkTokenRoute = require('./serviceRoutes/checkToken')

const router = express.Router();

router.use('/upload',uploadRoute);
router.use('/delete', deleteRoute);
router.use('/check-router', checkTokenRoute);
router.use('*', (req, res) => {
    res.status(404).json({ error: 'URL not found' });
  });
module.exports = router;
