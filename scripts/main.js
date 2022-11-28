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
		this.food = [];
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

		// this.getScores();
		this.addFood();
	}

	directSnake(direction) {
		// TODO - Bug where if you click the current direction again it begins to speed up.
		const isFood = this.isFood(this.snake[0]);

		if (direction === 'right' && this.currentDirection !== 'left') {
			const row = this.snake[0][0];
			const col = this.snake[0][1] + 1;

			this.makeMove(row, col, 'right', isFood);
		}

		if (direction === 'left' && this.currentDirection !== 'right') {
			const row = this.snake[0][0];
			const col = this.snake[0][1] - 1;

			this.makeMove(row, col, 'left', isFood);
		}

		if (direction === 'up' && this.currentDirection !== 'down') {
			const row = this.snake[0][0] - 1;
			const col = this.snake[0][1];

			this.makeMove(row, col, 'up', isFood);
		}

		if (direction === 'down' && this.currentDirection !== 'up') {
			const row = this.snake[0][0] + 1;
			const col = this.snake[0][1];

			this.makeMove(row, col, 'down', isFood);
		}

		return;
	}

	makeMove(row, col, direction, eating) {
		let head = [row, col];
		let headSquare, tailSquare, foodSquare;
		this.snake.unshift(head);

		if (headSquare === null) {
			const info = document.getElementById('info');
			info.innerHTML = 'You Lose';
			return;
		}

		headSquare = document.getElementById(`${this.snake[0].join(',')}`);
		foodSquare = document.getElementById(`${this.food.join(',')}`);

		headSquare.classList.add('snake-body');

		if (eating) {
			foodSquare.classList.remove('food');
			this.addFood();
		} else {
			let tail = this.snake.pop();
			tailSquare = document.getElementById(tail.join(','));
			tailSquare.classList.remove('snake-body');
		}

		this.currentDirection = direction;

		setTimeout(() => {
			if (this.currentDirection !== direction) return;
			else this.directSnake(this.currentDirection);
		}, 1200 / this.speed);
	}

	addFood() {
		const randomLocation = `${Math.floor(Math.random() * 17)},${Math.floor(
			Math.random() * 17
		)}`;

		this.snake.forEach((segment) => {
			if (segment.join(',') === randomLocation) {
				this.addFood();
			} else {
				this.food = randomLocation.split(',');
				document.getElementById(randomLocation).classList.add('food');
			}
		});
	}

	isFood(head) {
		if (this.food.join(',') === head.join(',')) {
			return true;
		} else {
			return false;
		}
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
