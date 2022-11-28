console.log('Connected!');
const game = document.getElementById('game');
const scoreBoard = document.getElementById('scoreBoard');

class Game {
	constructor() {
		this.gridSize = 32;
		this.score = 0;
		this.highScore = 0;
		this.snake = [
			[8, 8],
			[8, 7],
			[8, 6],
		];
		this.currentDirection = '';
		this.speed = 3;
	}

	buildGrid() {
		for (let i = 0; i < this.gridSize; i++) {
			for (let j = 0; j < this.gridSize; j++) {
				let square = document.createElement('div');
				square.classList.add('background');
				square.id = `${i},${j}`;

				game.appendChild(square);
			}
		}
	}

	addSnake() {
		this.snake.forEach((segment) => {
			document.getElementById(segment).classList.add('snake-body');
		});

		this.getScores();
	}

	directSnake(direction) {
		// TODO - Bug where if you click the current direction again it begins to speed up.

		if (direction === 'right' && this.currentDirection !== 'left') {
			const row = this.snake[0][0];
			const col = this.snake[0][1] + 1;

			this.makeMove(row, col, 'right');
		}

		if (direction === 'left' && this.currentDirection !== 'right') {
			const row = this.snake[0][0];
			const col = this.snake[0][1] - 1;

			this.makeMove(row, col, 'left');
		}

		if (direction === 'up' && this.currentDirection !== 'down') {
			const row = this.snake[0][0] - 1;
			const col = this.snake[0][1];

			this.makeMove(row, col, 'up');
		}

		if (direction === 'down' && this.currentDirection !== 'up') {
			const row = this.snake[0][0] + 1;
			const col = this.snake[0][1];

			this.makeMove(row, col, 'down');
		}

		return;
	}

	makeMove(row, col, direction) {
		let head = [row, col];
		let tail = this.snake.pop();
		let headSquare, tailSquare;
		this.snake.unshift(head);

		headSquare = document.getElementById(`${this.snake[0].join(',')}`);
		tailSquare = document.getElementById(tail.join(','));

		if (headSquare === null) {
			const info = document.getElementById('info');
			info.innerHTML = 'You Lose';
			return;
		}

		headSquare.classList.add('snake-body');
		tailSquare.classList.remove('snake-body');

		this.currentDirection = direction;

		setTimeout(() => {
			if (this.currentDirection !== direction) return;
			else this.directSnake(this.currentDirection);
		}, 1200 / this.speed);
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
}

const newGame = new Game();

newGame.buildGrid();

newGame.addSnake();

window.onkeydown = (e) => {
	let left = 37;
	let up = 38;
	let right = 39;
	let down = 40;

	if (e.keyCode === left) {
		newGame.directSnake('left');
	}

	if (e.keyCode === up) {
		newGame.directSnake('up');
	}

	if (e.keyCode === right) {
		newGame.directSnake('right');
	}

	if (e.keyCode === down) {
		newGame.directSnake('down');
	}
};
