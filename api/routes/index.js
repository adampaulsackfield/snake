const { getScores, addScore } = require('../controllers/index');

const router = require('express').Router();

router.route('/scores').get(getScores).post(addScore);

module.exports = router;
