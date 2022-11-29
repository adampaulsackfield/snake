import { Game } from './Game.js';
import { Snake } from './Snake.js';

let newGame, newSnake;

const nameArea = document.getElementById('nameArea');
const name = document.getElementById('name');
const nameBtn = document.getElementById('nameBtn');

nameBtn.addEventListener('click', () => {
	newGame = new Game(name.value);
	newSnake = new Snake();

	nameArea.classList.add('none');

	newGame.buildGrid();
	newSnake.addSnake();
});

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
