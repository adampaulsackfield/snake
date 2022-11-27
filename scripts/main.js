console.log('Connected!');
const game = document.getElementById('game');

class Game {
	constructor(gridSize) {
		this.gridSize = gridSize;
		this.score = 0;
		this.highScore = 0;

		this.snake = [
			[8, 8],
			[8, 7],
			[8, 6],
		];
	}

	buildGrid() {
		for (let i = 0; i < this.gridSize; i++) {
			for (let j = 0; j < this.gridSize; j++) {
				let square = document.createElement('div');
				square.classList.add('background');
				square.id = `${i},${j}`;

				game.appendChild(square);
			}
		}
	}

	addSnake() {
		this.snake.forEach((segment) => {
			document.getElementById(segment).classList.add('snake-body');
		});
	}

	moveSnake(direction) {
		let head, tail, headSquare, tailSquare;

		if (direction === 'right') {
			head = [this.snake[0][0], this.snake[0][1] + 1];
			tail = this.snake.pop();
			this.snake.unshift(head);

			headSquare = document.getElementById(`${this.snake[0].join(',')}`);
			tailSquare = document.getElementById(tail.join(','));

			if (headSquare === null) {
				alert('Game Over');
				return;
			}

			headSquare.classList.add('snake-body');
			tailSquare.classList.remove('snake-body');
		}
	}
}

const newGame = new Game(32);

newGame.buildGrid();

newGame.addSnake();

const rightBtn = document.getElementById('right');

rightBtn.addEventListener('click', () => newGame.moveSnake('right'));
