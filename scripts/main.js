import { Game } from './Game.js';
import { Snake } from './Snake.js';

const newGame = new Game();
const newSnake = new Snake();

newGame.buildGrid();

newSnake.addSnake();

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
