require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes/mainRouter');
const authRouter = require('./routes/authRoutes/authRouter');
const adminRouter = require('./routes/adminRoutes/adminRouter');

const uploadRouter = require('./routes/uploadRouter');
const { connectDb } = require('./config');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 3000
const corsOptions = {
  origin: '*', 
  optionsSuccessStatus: 200
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
app.use('/upload', uploadRouter);
app.use('/admin', adminRoutes);

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
app.listen(PORT, async ( )=>{
  console.log("server is listening at " +PORT );
  await connectDb();
  
  })
module.exports = app;
