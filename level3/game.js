var canvas;
var ctx; 
var timer;
var p1Wins = 0;
var p2Wins = 0;
var interval = 1000 / 60;
var player;
var ball; 
var ballVx = -4; 
var ballVy = 2;
var p1Score = 0;
var p2Score = 0;

// Track keyboard inputs
var keysPressed = {
    w: false,
    s: false
};

// INITIALIZATION ---
canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");	

player = new GameObject("Player", 30, 180, 20, 100, "#5D3FD3");
ball = new GameObject("Ball", 400, 220, 20, 20, "#6042d6"); 

timer = setInterval(animate, interval);

// GAME ENGINE LOOP ---
function animate() {
	// Clear the canvas first
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();	
	
	//ctx.restore();
	
	// Paddle movement
	if (keysPressed.w) {
		player.y -= 6;
	}
	if (keysPressed.s) {
		player.y += 6;
	}
	
	// Collision & Boundaries
	checkBoundaries(player, canvas);
	checkPaddleCollision(ball, player);
	
	// Move ball
	ball.x += ballVx;
	ball.y += ballVy;

	// Ceiling and floor bounces
	if (ball.y <= 0) {
		ball.y = 0;
		ballVy *= -1;
	}
	if (ball.y + ball.height >= canvas.height) {
		ball.y = canvas.height - ball.height;
		ballVy *= -1;
	}

	// --- GOAL SCORING LOGIC ---
	
	// Ball goes past Left Wall -> Player 2 Scores!
	if (ball.x + ball.width < 0) {
		p2Score += 1;
		var p2ScoreElement = document.getElementById('p2Score');
		if (p2ScoreElement) p2ScoreElement.innerText = p2Score;
		resetBall();
	}

	// Ball goes past Right Wall -> Player 1 Scores!
	if (ball.x > canvas.width) {
		p1Score += 1;
		var p1ScoreElement = document.getElementById('p1Score');
		if (p1ScoreElement) p1ScoreElement.innerText = p1Score;
		resetBall();
	}

	// Draw game objects
	player.drawRect(ctx);
	ball.drawCircle(ctx);

	// SCOREBOARD TEXT
	ctx.save();
	ctx.font = "16px monospace";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.fillText("Player 1 | Player 2", canvas.width / 2, 30);
	ctx.fillText(p1Score + "-" + p2Score, canvas.width / 2, 50);
	ctx.restore();

	ctx.fillStyle = "yellow";
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.moveTo(canvas.width / 2, 0);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.fill();
	ctx.stroke();
}

// BALL RESET LOGIC ---
function resetBall() {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ballVx = (ballVx > 0) ? -4 : 4; 
	ballVy = 2; 
}