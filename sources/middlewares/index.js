module.exports = (req, res, next) => {
	// log request time
	req.requestTime = new Date().toISOString();
	console.log(`Request time: ${req.requestTime}`);
	next();
};
