import { Game } from './Game.js';

const nomSound = new Audio('./nom.wav');

export class Snake extends Game {
	constructor(score) {
		super(score);

		this.snake = [
			[8, 8],
			[8, 7],
			[8, 6],
		];
		this.currentDirection = '';
		this.speed = 3;
		this.food = [];
		this.moving = false;
		this.direction = null;
		this.pendingChanges = {
			row: '',
			col: '',
		};
		this.dead = false;
	}

	addSnake() {
		this.snake.forEach((segment) => {
			document.getElementById(segment).classList.add('snake-body');
		});

		this.addFood();
	}

	addFood() {
		const randomLocation = `${Math.floor(Math.random() * 17)},${Math.floor(
			Math.random() * 17
		)}`;

		for (let index = 0; index < this.snake.length; index++) {
			if (this.snake[index].join(',') === randomLocation) {
				this.addFood();
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
			// nomSound.play();
			return true;
		} else {
			return false;
		}
	}

	setDirection(direction) {
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
		this.dead = true;
	}

	directSnake() {
		let row, col;
		if (this.direction === 'right') {
			row = this.snake[0][0];
			col = this.snake[0][1] + 1;
		}

		if (this.direction === 'left') {
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
		}, 400 / this.speed);
	}
}
