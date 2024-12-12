const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Grid size for the snake and food
const canvasWidth = 600; // Fixed width of the game area
const canvasHeight = 400; // Fixed height of the game area


canvas.width = canvasWidth;
canvas.height = canvasHeight;

let snake = [{ x: Math.floor(canvasWidth / 2 / gridSize) * gridSize, y: Math.floor(canvasHeight / 2 / gridSize) * gridSize }];
let direction = 'RIGHT';
let food = spawnFood();
let score = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing

  // Draw snake
  snake.forEach(segment => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // Update score on the screen
  document.getElementById("score").textContent = "Score: " + score;

  moveSnake();
  checkCollision();
  checkFood();
}

function moveSnake() {
  let head = { ...snake[0] };

  switch (direction) {
    case 'UP':
      head.y -= gridSize;
      break;
    case 'DOWN':
      head.y += gridSize;
      break;
    case 'LEFT':
      head.x -= gridSize;
      break;
    case 'RIGHT':
      head.x += gridSize;
      break;
  }

  snake.unshift(head);
  snake.pop();
}

function checkCollision() {
  // Wall collision
  if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
    resetGame();
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      resetGame();
    }
  }
}

function checkFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    snake.push({}); // Add new segment to snake
    food = spawnFood(); // Respawn food
  }
}

function spawnFood() {
  let foodX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  let foodY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  return { x: foodX, y: foodY };
}

function resetGame() {
  snake = [{ x: Math.floor(canvas.width / 2 / gridSize) * gridSize, y: Math.floor(canvas.height / 2 / gridSize) * gridSize }];
  direction = 'RIGHT';
  score = 0;
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== 'DOWN') direction = 'UP';
      break;
    case "ArrowDown":
      if (direction !== 'UP') direction = 'DOWN';
      break;
    case "ArrowLeft":
      if (direction !== 'RIGHT') direction = 'LEFT';
      break;
    case "ArrowRight":
      if (direction !== 'LEFT') direction = 'RIGHT';
      break;
  }
});

function gameLoop() {
  draw();
  setTimeout(gameLoop, 100); // Call gameLoop every 100ms
}

gameLoop(); // Start the game loop
