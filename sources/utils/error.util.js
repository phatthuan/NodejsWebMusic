require('dotenv').config({ path: './config.env' });

class AppError extends Error {
	constructor(message, statusCode) {
		super(message);

		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

const sendErrorDev = (err, req, res) => {
	// A) API
	if (req.originalUrl.startsWith('/api')) {
		return res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	}

	// B) RENDERED WEBSITE
	console.error('ERROR 💥', err);
	return res.status(err.statusCode).render('error', {
		title: 'Something went wrong!',
		msg: err.message,
	});
};

const sendErrorProd = (err, req, res) => {
	// A) API
	if (req.originalUrl.startsWith('/api')) {
		// A) Operational, trusted error: send message to client
		if (err.isOperational) {
			return res.status(err.statusCode).json({
				status: err.status,
				message: err.message,
			});
		}
	}
	// B) Programming or other unknown error: don't leak error details
	// 1) Log error
	console.error('ERROR 💥', err);
	// 2) Send generic message
	return res.status(500).json({
		status: 'error',
		message: 'Something went very wrong!',
	});
};

const errorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	let env = process?.env?.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';
	if (env === 'development') {
		sendErrorDev(err, req, res);
		return;
	}
	if (env === `production`) {
		let error = { ...err };
		error.message = err.message;
		sendErrorProd(error, req, res);
	}
};

module.exports = {
	AppError,
	errorHandler,
};
