import { Game } from './Game.js';
import { Snake } from './Snake.js';

// HTML Elements
const nameInput = document.getElementById('name');
const nameBtn = document.getElementById('nameBtn');
const loseEl = document.getElementById('lose');
const startOverBtn = document.getElementById('startOverBtn');

// Load any returning User
let user = localStorage.getItem('name');

// Set default size
let size = 400;

if (window.innerWidth > 799) {
	size = 600;
	canvas.width = 600;
	canvas.height = 600;
}

// The function that starts the game
const startGame = () => {
	// Set user name and store for next visit
	user = nameInput.value;
	localStorage.setItem('name', user);

	// Initiate Classes
	const game = new Game(size, size, user);
	const snake = new Snake(size, size, user);

	// Hide the name form
	nameArea.classList.add('hide');

	// Create canvas, snake, food, and get scores.
	game.createCanvas();
	game.setName();
	snake.createSnake();
	game.getScores();
	snake.addFood();

	// Key press event listeners
	window.onkeydown = (e) => {
		let left = 37;
		let up = 38;
		let right = 39;
		let down = 40;

		if (e.keyCode === left) {
			snake.setDirection('left');
		}

		if (e.keyCode === up) {
			snake.setDirection('up');
		}

		if (e.keyCode === right) {
			snake.setDirection('right');
		}

		if (e.keyCode === down) {
			snake.setDirection('down');
		}
	};
};

// User name input event handler
const handleInput = () => {
	user = nameInput.value;
};

// If no user then add the input name.
if (!user) {
	user = nameInput.value;
	nameInput.value = '';
} else {
	startGame();
}

// Event listeners
nameBtn.addEventListener('click', startGame);
nameInput.addEventListener('click', handleInput);
startOverBtn.addEventListener('click', () => {
	loseEl.classList.add('hide');
	location.reload();
});
