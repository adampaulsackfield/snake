import { Game } from './Game.js';
import { Snake } from './Snake.js';

let newGame, newSnake;

const nameArea = document.getElementById('nameArea');
const nameBtn = document.getElementById('nameBtn');
const nameInput = document.getElementById('name');
const error = document.getElementById('error');
nameBtn.disabled = true;

let user = localStorage.getItem('name');

const handleStartGame = () => {
	localStorage.setItem('name', user);

	nameArea.classList.add('none');

	newGame = new Game(user);
	newSnake = new Snake();

	newGame.buildGrid();
	newSnake.addSnake();
};

if (user) {
	user = nameInput.value;
	handleStartGame();
}

const handleInput = () => {
	if (nameInput.value.length > 9) {
		error.classList.remove('nameArea__error--hide');
	} else {
		error.classList.add('nameArea__error--hide');
		nameBtn.disabled = false;
		user = nameInput.value;
	}
};

nameBtn.addEventListener('click', handleStartGame);
nameInput.addEventListener('keyup', handleInput);

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
