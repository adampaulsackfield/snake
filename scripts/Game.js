const scoreBoard = document.getElementById('scoreBoard');
const userName = document.getElementById('userName');

export class Game {
	constructor(width, height, name) {
		this.canvas = document.getElementById('canvas');
		this.world = this.canvas.getContext('2d');
		this.width = width;
		this.height = height;
		this.name = name;
		this.score = 0;
		this.highScores = [];
		this.pendingDirection = null;
		this.direction = null;
		this.moving = false;
		this.dead = false;
		this.coolDown = false;
	}

	setName() {
		userName.innerHTML = this.name;
	}

	createCanvas() {
		this.world.clearRect(0, 0, this.width, this.height);
		this.world.fillRect(0, 0, this.width, this.height);
		return;
	}

	updateCanvas(color, x, y, eating = false) {
		this.world.fillStyle = color;
		this.world.fillRect(x, y, this.grid, this.grid);
		return;
	}

	generateRandom() {
		return Math.floor(Math.random() * (this.width / this.grid)) * this.grid;
	}

	getScore() {
		return this.score;
	}

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

		this.highScores
			.sort((a, b) => b.score - a.score)
			.slice(0, 10)
			.forEach((entry) => {
				const li = document.createElement('li');
				li.classList.add('scoreBoard__item');
				li.innerHTML = `${entry.name}: ${entry.score}`;
				scoreBoard.appendChild(li);
			});
	}

	postScore() {
		if (this.score <= this.highScores[(this.highScores.length = 1)]) return;

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
			console.log(response);
		});
	}
}
