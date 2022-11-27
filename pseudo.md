# Pseudo Code

## Plan

Snake game implemented by using a given square grid size of black. Then using JS to add classes to change color representing the snake. Food spots can be added at random and eaten if same square as head.

- Create a Game Class, with constructor for: score, highScore, gridSize, snake location, and speed.
- Game Class should hold any methods related to the game.
  - buildGrid() - Nested iterators to create a 2D array.
  - addSnake() - Should add the snake at the start position.
  - moveSnake() - Should check a given direction and if possible to move within the bounds of the array then it should add a class to that grid square one forward from it head and remove the tail.
  - direction() - A method to take user input using the arrow keys.
