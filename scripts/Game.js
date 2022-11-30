const scoreBoard = document.getElementById('scoreBoard');
const userName = document.getElementById('userName');

export class Game {
	constructor(name) {
		this.gridSize = 30;
		this.score = 0;
		this.highScore = 0;
		this.name = name;
		this.speed = 3;
	}

	setName() {
		userName.innerHTML = this.name;
	}

	getScores() {
		return fetch('http://localhost:5550/api/scores')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.scores.length > 0) {
					data.scores.forEach((score) => {
						let p = document.createElement('div');
						p.innerHTML = `Name: ${score.name} Score: ${score.score}`;
						scoreBoard.appendChild(p);
					});
				} else {
					let p = document.createElement('div');
					p.innerHTML = `No High Scores`;
					scoreBoard.appendChild(p);
				}
			});
	}

	postScore() {
		// TODO
	}
}

// TODO - Snake can still go back the opposite direction
// TODO - Food can spawn under the snake's body
