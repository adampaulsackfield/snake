const gameBoard = document.getElementById('game');

export class Board {
	constructor(gridSize) {
		this.gridSize = gridSize;
	}

	buildGrid() {
		for (let i = 0; i < this.gridSize; i++) {
			for (let j = 0; j < this.gridSize; j++) {
				let square = document.createElement('div');
				square.classList.add('background');
				square.id = `${i},${j}`;

				gameBoard.appendChild(square);
			}
		}
	}

	removeGrid() {
		gameBoard.innerHTML = '';
	}
}
