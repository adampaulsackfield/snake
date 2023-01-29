# Snake

A Vanilla HTML, CSS and JavaScript implementation of the classic game Snake.

## About

This project is self-hosted on a ubuntu server, it is configured with nginx, https (certbot and letsencrypt), and cors enabled for the backend API. Additionally, the project is configured with a GitHub Action to deploy the build to the server and copy the files for nginx.

## Requirements

- PSEUDO-CODE: You will need to present a simple plan of your game to one of the coaches, this should include:
  - a guide on what is going to happen in your game in plain english
  - how you are planning on building it
  - a list of features the game will include, in order of importance
- VERSION CONTROL
  - You need to have it as a public repository on GitHub.
  - In the repo you will also need a README.md with a short intro to the project.
  - You must have at least 15 meaningful Git commits for the project and repo on GitHub, with descriptive names.
- READABILITY
  - Your JS code must be formatted as functions
  - Code must be formatted correctly using suitable indentation and variable names.
    -THE CODE
  - The code must be all your own, and you should be able to explain what everything does and why it is there. If you can’t explain it, you shouldn't use it.
  - You must use click or key press events in JavaScript to trigger the events in the game (no refreshing to start the game again!)
  - We would like you to take a mobile-first approach to the implementation. It needs to work on different device widths.

## Features

- [✅] Mobile First Design
- [✅] Keyboard Controls
- [✅] Speed increases on every 5th item of food consumed
- [✅] Canvas implementation - previously built with div elements and adding classes
- [✅] API integration to post high scores and retrieve them on game load. Only posts if you make the top 10
- [✅] Color toggler
- [✅] Custom messages depending on score
- [✅] Name input and persistence (localStorage)
- [✅] Database persistence - High-scores
- [✅] Eating sounds

## Approach

When planning this project I began prototyping with a 2D array, which I could map to a grid using HTML & CSS, using JS to toggle snake, food, and background classes. I knew once the grid was in place and I had worked out the size ratios, it would be quite simple to toggle classes. Once I had set the bounds of the world, it become time to add the movement, which was raised some issues with timing of key presses, if the user rapidly pressed two directions they could break the rules and do a 180^o, thankfully a 150ms timeout on the setDirection was perfect to stop this bug. Storing the snake in an array made it easy to manipulate the snake to move it's head and only remove the tail if the snake wasn't eating.

## API

The game has been build with an API built using Node, Express and Mongoose. For easier hosting it has been pulled from this repo and is viable [here](https://github.com/adampaulsackfield/score-api). The API is just bare bones and includes a post request for new scores and a get request for existing scores. The client has been updated to only post scores that make the top 10.
