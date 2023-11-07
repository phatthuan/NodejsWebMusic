const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const express = require('express');
const app = express();
const { errorHandler, AppError } = require('./utils/error.util');
const { rootRouter } = require('./routes/index');

// set handlebars as view engine
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Session
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'secret',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(cookieParser('secret'));

// Reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Config router
app.use(rootRouter);

// Handle 404
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

module.exports = app;
