const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const connectDB = () => {
	return mongoose
		.connect(process.env.DB_URI)
		.then(() => {
			console.log('connected');
		})
		.catch((err) => console.error(err));
};

module.exports = connectDB;
