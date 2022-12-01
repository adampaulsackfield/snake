import { Game } from './Game.js';
import { Board } from './Board.js';
import { Snake } from './Snake.js';

let user = localStorage.getItem('name');
let nameInput = document.getElementById('name');
let nameBtn = document.getElementById('nameBtn');
let newGameBtn = document.getElementById('newGame');
let startOverBtn = document.getElementById('startOverBtn');
let loseArea = document.getElementById('lose');

// Hide the error message for name length
error.classList.add('nameArea__error--hide');

const startGame = () => {
	// Set name for returning user
	localStorage.setItem('name', user);

	// Mobile board size
	let boardSize = 20;

	// Initiate Classes
	const newGame = new Game(user);
	const newBoard = new Board();
	const newSnake = new Snake();

	// Checks for larger display so we can increase grid size. Media queries in CSS assist with this feature by altering the dimensions.
	if (window.innerWidth > 799) {
		boardSize = 30;
	}

	// Hide Welcome Screen
	nameArea.classList.add('none');

	// Build Grid - Based on view port width
	newBoard.buildGrid(boardSize);

	// Get Scores
	newGame.getScores();
	newGame.buildScoreboard();

	// Set the players name
	newGame.setName();

	// Create a snake
	newSnake.addSnake();

	// Add Event Listeners
	window.onkeydown = (e) => {
		let left = 37;
		let up = 38;
		let right = 39;
		let down = 40;

		if (e.keyCode === left) {
			newSnake.setDirection('left');
		}

		if (e.keyCode === up) {
			newSnake.setDirection('up');
		}

		if (e.keyCode === right) {
			newSnake.setDirection('right');
		}

		if (e.keyCode === down) {
			newSnake.setDirection('down');
		}
	};
};

// If no stored user then we update with the value from input, else startGame as we have a name stored
if (!user) {
	user = nameInput.value;
	nameInput.value = '';
} else {
	startGame();
}

// Error handling for the user input
const handleInput = () => {
	if (nameInput.value.length > 9) {
		error.classList.remove('nameArea__error--hide');
	} else {
		error.classList.add('nameArea__error--hide');
		nameBtn.disabled = false;
		user = nameInput.value;
	}
};

// Add event listeners for name section
nameBtn.addEventListener('click', startGame);
nameInput.addEventListener('keyup', handleInput);
newGameBtn.addEventListener('click', () => {
	location.reload();
});

startOverBtn.addEventListener('click', () => {
	loseArea.classList.add('none');
	location.reload();
});
