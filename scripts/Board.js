import { Game } from './Game.js';

const gameEl = document.getElementById('game');

export class Board extends Game {
	constructor() {
		super();
	}

	buildGrid(size) {
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				let square = document.createElement('div');
				square.classList.add('background');
				square.id = `${i},${j}`;

				gameEl.appendChild(square);
			}
		}
	}

	removeGrid() {
		gameEl.innerHTML = '';
	}
}
