const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const propertiesRouter = require('./routes/properties');
const visitingListRouter = require('./routes/visiting-list');
const photoRouter = require('./routes/photos');


mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>
  console.log("Connected to mongo")
);


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'client/build/static')));


app.use('/users', usersRouter);
app.use('/properties', propertiesRouter);
app.use('/visitingList', visitingListRouter);
app.use('/photos', photoRouter);

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, 'client/build/')});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
