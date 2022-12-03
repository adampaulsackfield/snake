const userName = document.getElementById('userName');
const scoreBoard = document.getElementById('scoreBoard');

export class Game {
	constructor(name, gridSize) {
		this.name = name;
		this.gridSize = gridSize;
		this.score = 0;
	}

	setName() {
		userName.innerHTML = this.name;
	}

	generateRandom() {
		return `${Math.floor(Math.random() * this.gridSize)}`;
	}

	getScore() {
		return this.score;
	}

	updateScore() {
		return ++this.score;
	}

	getScores() {
		return fetch('https://snake-scoreboard-api.herokuapp.com/api/scores')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				this.highScores = data.scores;
				data.scores
					.sort((a, b) => b.score - a.score)
					.slice(0, 5)
					.forEach((entry) => {
						const li = document.createElement('li');
						li.classList.add('scoreItem');
						li.innerHTML = `${entry.name}: ${entry.score}`;
						scoreBoard.appendChild(li);
					});
			});
	}

	buildScoreboard() {
		console.log(this.highScores);
	}

	postScore() {
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
