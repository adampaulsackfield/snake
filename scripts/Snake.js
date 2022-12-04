import { Game } from './Game.js';

const score = document.getElementById('score');
const nomSound = new Audio('./nom.wav');
const loseEl = document.getElementById('lose');
const finalScore = document.getElementById('finalScore');

export class Snake extends Game {
	constructor(user, gridSize, speed) {
		super(user, gridSize);

		this.speed = speed;
		this.snake = [
			[8, 8],
			[8, 7],
			[8, 6],
		];
		this.food = null;
		this.moving = false;
		this.direction = null;
		this.pendingDirection = null;
		this.dead = false;
	}

	// Initialize the snake by adding the red color class
	addSnake() {
		this.snake.forEach((segment) => {
			document.getElementById(segment).classList.add('snake-body');
		});
	}

	// Using the generateRandom method, we generate random X and Y coords for the grid size, If the food is under the snake we return the same function until we have a food that is visible to the player.
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
		document.getElementById(food.join(',')).classList.add('food');
	}

	// Check if the Snake's Head is in the same location as the food. If so, increment score and play sound.
	isFood() {
		if (this.food.join(',') === this.snake[0].join(',')) {
			score.innerHTML = this.updateScore();
			nomSound.play();

			return true;
		} else {
			return false;
		}
	}

	// Used for taking user input, checks to ensure that it is a legal move. Also sets as pendingDirection. On game start the !this.moving will be met and thus the game starts with directSnake()
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

	// Check for ensuring the snake is not crashing into it's own body
	isSnake(coords) {
		for (let i = 0; i < this.snake.length; i++) {
			if (coords.join(',') === this.snake[i].join(',')) {
				this.gameOver();
				break;
			}
		}
	}

	// Sets the dead property, displays the lose screen, adds the score and makes a post request to the DB.
	gameOver() {
		this.dead = true;
		loseEl.classList.remove('hide');
		this.postScore({ name: this.name, score: this.score });
		finalScore.innerHTML = this.getScore();
	}

	// Logic for setting the next coords to apply the snake-body. As it is a 2D array we just need to increment or decrement the correct row or col.
	directSnake() {
		let coordX, coordY;

		if (this.direction === 'right' && this.direction !== 'left') {
			coordX = this.snake[0][0];
			coordY = this.snake[0][1] + 1;
		}

		if (this.direction === 'left' && this.direction !== 'right') {
			coordX = this.snake[0][0];
			coordY = this.snake[0][1] - 1;
		}

		if (this.direction === 'up') {
			coordX = this.snake[0][0] - 1;
			coordY = this.snake[0][1];
		}

		if (this.direction === 'down') {
			coordX = this.snake[0][0] + 1;
			coordY = this.snake[0][1];
		}

		if (this.isSnake([coordX, coordY])) return this.gameOver();
		else this.moveSnake(coordX, coordY, this.isFood());
	}

	// Where the snake segments and food elements are updated in the DOM. We check if the snake is eating, as if it is eating we only need to move the head, else move the head and remove the tail. setTimeout is used to set the game speed.
	moveSnake(coordX, coordY, eating) {
		let head = [coordX, coordY];
		let headElement, tailElement;

		if (this.dead) return;

		if (eating) {
			const food = document.getElementById(this.food.join(','));
			food.classList.remove('food');
			this.addFood();
		} else {
			const tail = this.snake.pop();
			tailElement = document.getElementById(tail.join(','));
			tailElement.classList.remove('snake-body');
		}

		this.snake.unshift(head);

		headElement = document.getElementById(this.snake[0].join(','));

		if (headElement === null) return this.gameOver();

		headElement.classList.add('snake-body');

		setTimeout(() => {
			this.directSnake();
		}, 400 / this.speed);
	}
}
