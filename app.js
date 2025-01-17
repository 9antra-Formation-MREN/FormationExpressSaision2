var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http'); //1
const { connectToMongoDB } = require('./db/BD'); //3
const session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var osRouter= require('./routes/os');
var carsRouters= require('./routes/carRouter');

var app = express();

require("dotenv").config(); //2

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.Net_Secret,
  resave: false,
  saveUninitialized : true,
  cookie: { secure: false , maxAge: 2 *60 * 60} 
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/cars', carsRouters );

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
  res.json('error');
});


const server = http.createServer(app); //1
server.listen(process.env.PORT, () => {connectToMongoDB(),console.log("app is running on port 5000 ,")} ) //4

module.exports = app;
