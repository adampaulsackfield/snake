import { Game } from './Game.js';
import { Snake } from './Snake.js';

const nameInput = document.getElementById('name');
const nameBtn = document.getElementById('nameBtn');
const loseEl = document.getElementById('lose');
const startOverBtn = document.getElementById('startOverBtn');

let user = localStorage.getItem('name');

const startGame = () => {
	user = nameInput.value;
	localStorage.setItem('name', user);

	const game = new Game(600, 600, 'adam');
	const snake = new Snake(600, 600);

	nameArea.classList.add('hide');

	game.createCanvas();
	game.setName();
	snake.createSnake();
	game.getScores();
	snake.addFood();

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

const handleInput = () => {
	user = nameInput.value;
};

if (!user) {
	user = nameInput.value;
	nameInput.value = '';
} else {
	startGame();
}

nameBtn.addEventListener('click', startGame);
nameInput.addEventListener('click', handleInput);
startOverBtn.addEventListener('click', () => {
	loseEl.classList.add('hide');
	location.reload();
});
