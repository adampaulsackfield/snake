const scoreBoard = document.getElementById('scoreBoard');
const userName = document.getElementById('userName');

export class Game {
	constructor(name) {
		this.gridSize = 30;
		this.score = 0;
		this.highScore = 0;
		this.speed = 3;
		this.highScores = [];
		this.name = name;
	}

	setName() {
		userName.innerHTML = this.name;
	}

	getScores() {
		return fetch('https://snake-scoreboard-api.herokuapp.com/api/scores')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data.scores);
				this.highScores = data.scores;
				data.scores
					.sort((a, b) => b.score - a.score)
					.slice(0, 5)
					.reverse()
					.forEach((entry) => {
						const li = document.createElement('li');
						li.classList.add('scoreItem');
						li.innerHTML = `${entry.name}: ${entry.score}`;
						scoreBoard.appendChild(li);
					});
			});
	}

	buildScoreboard() {
		console.log(this.highScores);
	}

	postScore(entry) {
		return fetch('https://snake-scoreboard-api.herokuapp.com/api/scores', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			//make sure to serialize your JSON body
			body: JSON.stringify({
				data: {
					name: userName.innerHTML,
					score: entry.score,
				},
			}),
		}).then((response) => {
			//do something awesome that makes the world a better place
			console.log(response);
		});
	}
}

// TODO - Snake can still go back the opposite direction
// TODO - Food can spawn under the snake's body
