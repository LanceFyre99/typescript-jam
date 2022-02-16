import { setupControls } from './controller';
import { Segment } from './Segment';
import { settings } from './settings';
import { foodState, gameState, inputState } from './state';

let gameLoop = null;

// Listen for application load
document.addEventListener('DOMContentLoaded', onDOMLoaded, false);
function onDOMLoaded() {
  init();
}

// Initialize animation and game
function init() {
  setupControls(inputState);

  document.getElementById('score').innerHTML = '0';
  gameState.snake.push(new Segment(settings.startX, settings.startY, true));
  gameLoop = setInterval(tick, 75);
}

// Runs an individual frame tick
function tick(dt: number) {
  // If this gets set to true, it's a game over
  let death = false;

  // Spawn food if none exists
  if (foodState.exists == false) {
    foodState.exists = true;
    foodState.x = Math.floor(Math.random() * 22.9) * 10 + 10;
    foodState.y = Math.floor(Math.random() * 22.9) * 10 + 10;
  }

  // Get canvas
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  // Draw border and play area
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, 250, 250);
  ctx.fillStyle = 'rgba(255, 255, 255)';
  ctx.fillRect(10, 10, 230, 230);

  // Check for input, adjust movement direction accordingly
  switch (true) {
    case inputState.up:
      gameState.deltaX = 0;
      gameState.deltaY = -settings.speed;
      break;
    case inputState.down:
      gameState.deltaX = 0;
      gameState.deltaY = settings.speed;
      break;
    case inputState.right:
      gameState.deltaX = settings.speed;
      gameState.deltaY = 0;
      break;
    case inputState.left:
      gameState.deltaX = -settings.speed;
      gameState.deltaY = 0;
      break;
  }

  let lastX = 0;
  let lastY = 0;

  for (const part of gameState.snake) {
    // if the head is touching another part of the snake, gameover
    if (part.head == false) {
      if (part.x == gameState.snake[0].x && part.y == gameState.snake[0].y) {
        death = true;
      }
    }

    // Delete old parts
    ctx.save();
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.translate(part.x, part.y);
    ctx.fillRect(0, 0, 10, 10);
    ctx.restore();

    // Adjust position
    if (part.head) {
      lastX = part.x;
      lastY = part.y;
      part.x += gameState.deltaX;
      part.y += gameState.deltaY;
    } else {
      let myX = part.x;
      let myY = part.y;
      part.x = lastX;
      part.y = lastY;
      lastX = myX;
      lastY = myY;
    }

    // Start drawing
    ctx.save();

    // Translate
    ctx.translate(part.x, part.y);
    if (part.head) {
      ctx.fillStyle = 'rgb(0, 150, 0)';
    } else {
      ctx.fillStyle = 'rgb(0, 200, 0)';
    }

    // Fill
    ctx.fillRect(0, 0, 10, 10);

    // Finish drawing
    ctx.restore();
  }

  // Score a point and add a new segment if head overlaps food
  if (gameState.snake[0].x == foodState.x && gameState.snake[0].y == foodState.y) {
    foodState.exists = false;
    gameState.score += 1;
    document.getElementById('score').innerHTML = String(gameState.score);
    gameState.snake.push(new Segment(lastX, lastY, false));
  }

  // Draw food if not eaten
  if (foodState.exists) {
    ctx.save();
    ctx.translate(foodState.x, foodState.y);
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.fillRect(0, 0, 10, 10);
    ctx.restore();
  }

  // Gameover if moving into border
  if (gameState.snake[0].x > 230) {
    death = true;
  } else if (gameState.snake[0].y > 230) {
    death = true;
  } else if (gameState.snake[0].x < 10) {
    death = true;
  } else if (gameState.snake[0].y < 10) {
    death = true;
  }

  // Gameover. Reset globals, end the gameloop, draw over play area
  if (death) {
    gameState.snake = [];
    foodState.exists = false;
    gameState.deltaX = settings.speed;
    gameState.deltaY = 0;
    gameState.score = 0;
    clearInterval(gameLoop);
    gameLoop = null;
    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 250, 250);
    return;
  }
}
