import { Game } from './Game.js';

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
	}

	addSnake() {
		this.snake.forEach((segment) => {
			document.getElementById(segment).classList.add('snake-body');
		});

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

		headSquare = document.getElementById(`${this.snake[0].join(',')}`);
		foodSquare = document.getElementById(`${this.food.join(',')}`);

		if (headSquare === null) {
			console.log('you Lose');
			return;
		}

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
			score.innerHTML = ++this.score;
			return true;
		} else {
			return false;
		}
	}
}
