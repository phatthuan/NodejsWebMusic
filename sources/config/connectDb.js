const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.set('strictPopulate', false);
// Connect to MongoDB
const connectDb = async () => {
	console.log('Connecting to MongoDB...');
	if (!process.env.DATABASE_PASSWORD || !process.env.DATABASE_URI) {
		throw new Error('DATABASE_PASSWORD must be defined');
	}
	const DB = process.env.DATABASE_URI?.replace('<password>', process.env.DATABASE_PASSWORD);
	try {
		await mongoose.connect(DB);
		console.log(`MongoDB Connected on ${DB}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

module.exports = connectDb;
