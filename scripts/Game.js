const game = document.getElementById('game');
const scoreBoard = document.getElementById('scoreBoard');
const score = document.getElementById('score');
const userName = document.getElementById('userName');

export class Game {
	constructor(name) {
		this.gridSize = 30;
		this.score = 0;
		this.highScore = 0;
		this.name = name;
	}

	buildGrid() {
		console.log('Building grid');
		for (let i = 0; i < this.gridSize; i++) {
			for (let j = 0; j < this.gridSize; j++) {
				let square = document.createElement('div');
				square.classList.add('background');
				square.id = `${i},${j}`;

				game.appendChild(square);
			}
		}
		userName.innerHTML = this.name;

		// this.getScores();
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
