const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
	name: {
		required: true,
		type: String,
		max: 16,
	},
	score: {
		required: true,
		type: Number,
	},
});

module.exports = mongoose.model('Score', scoreSchema);
