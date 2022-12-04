const gameBoard = document.getElementById('game');

export class Board {
	constructor(gridSize) {
		this.gridSize = gridSize;
	}

	// Builds a grid which can be accessed as a 2D array. Each section has an ID of its coords in the format 'X,Y'. This makes it easy to access every square in the same. GridSize is variable depending on screen size.
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
}
