import { Game } from './Game.js';

const nomSound = new Audio('./nom.wav');
const loseEl = document.getElementById('lose');
const finalScore = document.getElementById('finalScore');

export class Snake extends Game {
	constructor(score, speed, postScore, name, gridSize) {
		super(score, speed, postScore, name, gridSize);

		this.snake = [
			[8, 8],
			[8, 7],
			[8, 6],
		];
		this.currentDirection = '';
		this.food = [];
		this.moving = false;
		this.direction = null;
		this.pendingDirection = null;
		this.dead = false;
	}

	addSnake() {
		this.snake.forEach((segment) => {
			document.getElementById(segment).classList.add('snake-body');
		});
		console.log('addSnake', this.name);
		this.addFood();
	}

	addFood() {
		const randomLocation = `${Math.floor(
			Math.random() * this.gridSize
		)},${Math.floor(Math.random() * this.gridSize)}`;

		for (let index = 0; index < this.snake.length; index++) {
			if (this.snake[index].join(',') === randomLocation) {
				this.addFood();
				break;
			} else {
				this.food = randomLocation.split(',');
				document.getElementById(randomLocation).classList.add('food');
				break;
			}
		}
	}

	isFood() {
		if (this.food.join(',') === this.snake[0].join(',')) {
			score.innerHTML = ++this.score;
			nomSound.play();
			return true;
		} else {
			return false;
		}
	}

	setDirection(direction) {
		this.pendingDirection = direction;
		if (this.direction === 'right' && direction === 'left') return;
		if (this.direction === 'left' && direction === 'right') return;
		if (this.direction === 'up' && direction === 'down') return;
		if (this.direction === 'down' && direction === 'up') return;

		this.direction = direction;

		if (!this.moving) {
			this.moving = true;
			this.directSnake();
		}
	}

	isSnake(coordsArr) {
		for (let i = 0; i < this.snake.length; i++) {
			if (coordsArr.join(',') === this.snake[i].join(',')) {
				this.gameOver();
				break;
			}
		}
	}

	gameOver() {
		let name = this.name;
		finalScore.innerHTML = this.score;
		this.postScore({ name, score: this.score });
		loseEl.classList.remove('none');
		this.dead = true;
	}

	directSnake() {
		let row, col;
		if (this.direction === 'right' && this.direction !== 'left') {
			row = this.snake[0][0];
			col = this.snake[0][1] + 1;
		}

		if (this.direction === 'left' && this.direction !== 'right') {
			row = this.snake[0][0];
			col = this.snake[0][1] - 1;
		}

		if (this.direction === 'up') {
			row = this.snake[0][0] - 1;
			col = this.snake[0][1];
		}

		if (this.direction === 'down') {
			row = this.snake[0][0] + 1;
			col = this.snake[0][1];
		}

		if (this.isSnake([row, col])) return this.gameOver();
		else this.moveSnake(row, col, this.isFood());
	}

	moveSnake(row, col, eating) {
		if (this.dead) return;

		if (eating) {
			let foodSquare = document.getElementById(`${this.food.join(',')}`);
			foodSquare.classList.remove('food');
			this.addFood();
		}
		let head = [row, col];
		let headSquare, tailSquare, foodSquare;
		this.snake.unshift(head);

		headSquare = document.getElementById(`${this.snake[0].join(',')}`);
		foodSquare = document.getElementById(`${this.food.join(',')}`);

		if (headSquare === null) {
			console.log('you Lose');
			this.gameOver();
			return;
		}

		headSquare.classList.add('snake-body');

		if (!eating) {
			let tail = this.snake.pop();
			tailSquare = document.getElementById(tail.join(','));
			tailSquare.classList.remove('snake-body');
		}

		setTimeout(() => {
			this.directSnake();
			console.log(this.speed);
		}, 400 / this.speed);
	}
}
