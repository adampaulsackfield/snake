const scoreBoard = document.getElementById('scoreBoard');
const userName = document.getElementById('userName');
const loseEl = document.getElementById('lose');
const finalScore = document.getElementById('finalScore');
const loseMsg = document.getElementById('loseMsg');

export class Game {
	constructor(width, height, name) {
		this.canvas = document.getElementById('canvas');
		this.world = this.canvas.getContext('2d');
		this.width = width;
		this.height = height;
		this.grid = 15;
		this.name = name;
		this.score = 0;
		this.highScores = [];
	}

	// Sets the username to the HTML element
	setName() {
		userName.innerHTML = this.name;
	}

	// Create the canvas element
	createCanvas() {
		this.world.clearRect(0, 0, this.width, this.height);
		this.world.fillRect(0, 0, this.width, this.height);
		return;
	}

	// Method for painting the canvas
	updateCanvas(color, x, y, eating = false) {
		this.world.fillStyle = color;
		this.world.fillRect(x, y, this.grid, this.grid);
		return;
	}

	// Generates a random coord, that is divisible by 15(grid size).
	generateRandom() {
		return Math.floor(Math.random() * (this.width / this.grid)) * this.grid;
	}

	// Get Score
	getScore() {
		return this.score;
	}

	// Returns the score, after incrementing it
	updateScore() {
		return ++this.score;
	}

	// Simple GET request to get current high scores
	getScores() {
		return fetch('https://snake-scoreboard-api.herokuapp.com/api/scores')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				this.highScores = data.scores;
				this.buildScoreboard();
			});
	}

	// Sort, slice and build the scoreboard.
	buildScoreboard() {
		scoreBoard.innerHTML = '';

		const scoreHeader = document.createElement('h1');
		scoreHeader.innerHTML = 'High Scores';
		scoreHeader.classList.add('scoreBoard__header');
		scoreBoard.appendChild(scoreHeader);

		this.highScores
			.sort((a, b) => b.score - a.score)
			.slice(0, 10)
			.forEach((entry, i) => {
				const li = document.createElement('li');
				li.classList.add('scoreBoard__item');
				li.innerHTML = `${entry.name}: ${entry.score}`;
				if (i > 4) li.classList.add('scoreBoard__item--hide');
				scoreBoard.appendChild(li);
			});
	}

	// Simple POST request, if score is in the top 10
	postScore() {
		loseEl.classList.remove('hide');
		finalScore.innerHTML = this.getScore();
		loseMsg.innerHTML = "You made into the top 10! That's awesome!";

		if (this.score <= this.highScores[this.highScores.length - 1]) {
			loseMsg.innerHTML = "You didn't make the cut this time.";
		}

		return fetch('https://snake-scoreboard-api.herokuapp.com/api/scores', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				data: {
					name: this.name,
					score: this.score,
				},
			}),
		}).then((response) => {
			if (response.status === 201) {
				if (this.score > this.highScores[0]) {
					loseMsg.innerHTML = 'You reached the top of the leader board.';
				}
			}
		});
	}
}
