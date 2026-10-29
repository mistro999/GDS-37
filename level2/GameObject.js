function GameObject(name, x, y, width, height, color) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color || "#6042d6";
    if (name === "Ball" || name === "ball") {
        this.width = width || 20;
        this.height = height || 20;
    } else {
        this.width = width || 20;
        this.height = height || 100;
    }

    this.drawRect = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };

    this.drawCircle = function(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    };
}

// SEPARATE FUNCTION: Only run this on the paddle! Never pass the ball to it.
function checkBoundaries(object, canvas) {
    if (object.y < 0) {
        object.y = 0;
    }
    if (object.y + object.height > canvas.height) { 
        object.y = canvas.height - object.height;
    }
}

// SEPARATE FUNCTION: Fixed paddle collision for horizontal bounce
function checkPaddleCollision(ball, paddle) {
    if (ball.x < paddle.x + paddle.width &&
        ball.x + ball.width > paddle.x &&
        ball.y < paddle.y + paddle.height &&
        ball.y + ball.height > paddle.y) {

        // Reverse horizontal direction
        ballVx *= -1; 
        
        // Push the ball out of the paddle so it doesn't get stuck bouncing inside it
        ball.x = paddle.x + paddle.width; 
    }
}

var keysPressed = { w: false, s: false };

addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'W') {
        keysPressed.w = true;
    }
    if (event.key === 's' || event.key === 'S') {
        keysPressed.s = true;
    }
});

addEventListener('keyup', function(event) {
    if (event.key === 'w' || event.key === 'W') {
        keysPressed.w = false;
    }
    if (event.key === 's' || event.key === 'S') {
        keysPressed.s = false;
    }
});

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var paddle = new GameObject("Player", 30, 180, 20, 100, "#6042d6");
var ball = new GameObject("Ball", 200, 100, 20, 20, "#6042d6");
var ballVx = -4; // Starts moving left toward the paddle
var ballVy = 4;

function animationLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Paddle Movement
    if (keysPressed.w) {
        paddle.y -= 5;
    }
    if (keysPressed.s) {
        paddle.y += 5;
    }
    checkBoundaries(paddle, canvas); // ONLY bound the paddle
    
    // Ball Movement
    ball.x += ballVx;
    ball.y += ballVy;
    
    // Run paddle collision
    checkPaddleCollision(ball, paddle);
    
    // --- WALL PHYSICS ---
    
    // Bounce off Top Wall
    if (ball.y < 0) {
        ball.y = 0;
        ballVy *= -1;
    }
    // Bounce off Bottom Wall
    if (ball.y + ball.height > canvas.height) {
        ball.y = canvas.height - ball.height;
        ballVy *= -1;
    }
    
    // Bounce off Right Wall
    if (ball.x + ball.width > canvas.width) {
        ball.x = canvas.width - ball.width;
        ballVx *= -1;
    }

    // THE LEFT WALL RULE: Completely ignore x < 0 wall bounds.
    // If the ball's entire body goes past the left edge, reset it to center.
    if (ball.x + ball.width < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ballVx = -4; // Direct back toward player paddle
    }
    
    // Render
    paddle.drawRect(context);
    ball.drawCircle(context);
    
    requestAnimationFrame(animationLoop);
}

// Fire up the engine
requestAnimationFrame(animationLoop);
