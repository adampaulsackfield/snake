import { Game } from './Game.js';

const score = document.getElementById('score');
const nomSound = new Audio('./nom.wav');
const loseEl = document.getElementById('lose');
const finalScore = document.getElementById('finalScore');

export class Snake extends Game {
	constructor(width, height) {
		super(width, height);

		this.width = width;
		this.height = height;
		this.grid = 15;
		this.snakeHead = [150, 150];
		this.snake = [];
		this.speed = 3;
		this.food = null;
		this.size = 3;
		this.coolDown = false;
	}

	createSnake() {
		this.updateCanvas('red', this.snakeHead[0], this.snakeHead[1]);
	}

	addFood() {
		const randomX = this.generateRandom();
		const randomY = this.generateRandom();
		const food = [Number(randomX), Number(randomY)];
		for (let i = 0; i < this.snake.length; i++) {
			if (this.snake[i].join(',') === food.join(',')) {
				return this.addFood();
			}
		}

		this.food = food;
		this.updateCanvas('green', this.food[0], this.food[1], 'food');
	}

	isFood() {
		if (this.food.join(',') === this.snakeHead.join(',')) {
			nomSound.play();
			this.addFood();
			score.innerHTML = this.updateScore();
			if (this.score % 2 === 0 && this.score !== 0) {
				this.speed = this.speed + 0.2;
			}
			return true;
		}

		return false;
	}

	setDirection(direction) {
		if (this.coolDown) return;

		this.coolDown = true;

		this.pendingDirection = direction;

		if (this.direction === 'right' && direction === 'left') return;
		if (this.direction === 'left' && direction === 'right') return;
		if (this.direction === 'up' && direction === 'down') return;
		if (this.direction === 'down' && direction === 'up') return;

		this.direction = direction;

		if (!this.moving) {
			this.moving = true;
			this.move();
		}

		setTimeout(() => {
			this.coolDown = false;
		}, 150);
	}

	isSnake(coords) {
		for (let i = 0; i < this.snake.length; i++) {
			if (coords.join(',') === this.snake[i].join(',')) {
				this.gameOver();
				break;
			}
		}
	}

	gameOver() {
		this.dead = true;
		loseEl.classList.remove('hide');
		finalScore.innerHTML = this.getScore();
		this.postScore();
	}

	move() {
		if (this.dead) return;

		if (
			this.snakeHead[0] > this.width ||
			this.snakeHead[1] > this.height ||
			this.snakeHead[0] < 0 ||
			this.snakeHead[1] < 0 ||
			this.isSnake(this.snakeHead)
		) {
			return this.gameOver();
		}

		this.snake.push([this.snakeHead[0], this.snakeHead[1]]);

		if (this.direction === 'right' && this.direction !== 'left') {
			this.snakeHead[0] = this.snakeHead[0] + this.grid;
		}

		if (this.direction === 'left' && this.direction !== 'right') {
			this.snakeHead[0] = this.snakeHead[0] - this.grid;
		}

		if (this.direction === 'up') {
			this.snakeHead[1] = this.snakeHead[1] - this.grid;
		}

		if (this.direction === 'down') {
			this.snakeHead[1] = this.snakeHead[1] + this.grid;
		}

		this.updateCanvas('red', this.snakeHead[0], this.snakeHead[1]);

		if (this.snake.length > this.size && !this.isFood()) {
			let tail = this.snake.shift();
			this.updateCanvas('black', tail[0], tail[1]);
		}

		setTimeout(() => {
			this.move();
			this.coolDown = false;
		}, 600 / this.speed);
	}
}
