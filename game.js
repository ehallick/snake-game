const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    {x: 10, y: 10}
];
let food = {};
let dx = 1;
let dy = 0;
let score = 0;
let gameRunning = true;
let gamePaused = false;

function randomFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function drawGame() {
    if (!gameRunning) {
        return;
    }
    
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#4CAF50';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
    
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    
    if (gamePaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.font = '16px Arial';
        ctx.fillText('Press SPACEBAR to continue', canvas.width / 2, canvas.height / 2 + 40);
    }
}

function moveSnake() {
    if (!gameRunning || gamePaused) return;
    
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // Wrap around walls
    if (head.x < 0) {
        head.x = tileCount - 1;
    } else if (head.x >= tileCount) {
        head.x = 0;
    }
    
    if (head.y < 0) {
        head.y = tileCount - 1;
    } else if (head.y >= tileCount) {
        head.y = 0;
    }
    
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        randomFood();
    } else {
        snake.pop();
    }
}

function gameOver() {
    gameRunning = false;
    restartBtn.style.display = 'block';
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 60);
}

function restartGame() {
    snake = [{x: 10, y: 10}];
    dx = 1;
    dy = 0;
    score = 0;
    gameRunning = true;
    gamePaused = false;
    scoreElement.textContent = score;
    restartBtn.style.display = 'none';
    randomFood();
}

function handleKeyPress(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const SPACEBAR = 32;
    
    const keyPressed = event.keyCode;
    
    // Prevent default behavior for arrow keys and spacebar
    if ([LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY, SPACEBAR].includes(keyPressed)) {
        event.preventDefault();
    }
    
    // Handle pause/unpause
    if (keyPressed === SPACEBAR && gameRunning) {
        gamePaused = !gamePaused;
        return;
    }
    
    if (!gameRunning || gamePaused) return;
    
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;
    
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function gameLoop() {
    moveSnake();
    drawGame();
}

document.addEventListener('keydown', handleKeyPress);
restartBtn.addEventListener('click', restartGame);

randomFood();
setInterval(gameLoop, 100);