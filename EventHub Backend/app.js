require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes/mainRouter');
const authRouter = require('./routes/authRoutes/authRouter');
const adminRouter = require('./routes/adminRouter');
const { authMiddleware } = require('./middleware/authMiddleware');
const { roleMiddleware } = require('./middleware/roleMiddleware');
const serviceRouter = require('./routes/serviceRouter');
const { connectDb } = require('./config');
const cors = require('cors');
const cron = require('node-cron');
const Event = require('./models/Event'); // Make sure the path to your Event model is correct

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', mainRouter);
app.use('/auth', authRouter);
app.use('/service', authMiddleware, serviceRouter);
app.use('/admin', authMiddleware, roleMiddleware('Admin'), adminRouter);

// Set up cron job to update event statuses
cron.schedule('0 * * * *', async () => {
  try {
    const currentDate = new Date();
    const eventsToUpdate = await Event.updateMany(
      { status: 'Approved', date_to: { $lt: currentDate } },
      { $set: { status: 'Complete' } }
    );

    console.log(`${eventsToUpdate.modifiedCount} events updated to 'Complete'.`);
  } catch (error) {
    console.error('Error updating events:', error);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start server and connect to the database
app.listen(PORT, async () => {
  console.log('Server is listening at ' + PORT);
  await connectDb();
});

module.exports = app;
