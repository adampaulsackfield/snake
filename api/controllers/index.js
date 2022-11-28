const Score = require('../models/score.model');

const getScores = async (req, res, next) => {
	try {
		const scores = await Score.find();

		res.status(200).send({ scores });
	} catch (err) {
		console.log(err);
		next();
	}
};

const addScore = async (req, res, next) => {
	const { data } = req.body;

	console.log(req.body);

	try {
		if (!data.name || !data.score) {
			throw new Error('missing required fields');
		}

		let newScore = {
			name: data.name,
			score: data.score,
		};

		const savedScore = await Score.create(newScore);

		res.status(201).send({ score: savedScore });
	} catch (err) {
		console.log(err);
		next();
	}
};

module.exports = {
	getScores,
	addScore,
};
