var canvas;
var ctx; // Changed to match your draw functions
var timer;
var p1Wins = 0;
var p2Wins = 0;
var interval = 1000 / 60;
var player;
var ball; // Added ball definition
var ballVx = -4; // Added default ball speed
var ballVy = 2;
var p1Score = 0;
var p2Score = 0;

canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");	

player = new GameObject("Player", 30, 180, 20, 100, "#5D3FD3");
ball = new GameObject("Ball", 400, 220, 20, 20, "#6042d6"); // Create the ball object

timer = setInterval(animate, interval);

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);	
	
	if (keysPressed.w) {
		player.y -= 6;
	}
	if (keysPressed.s) {
		player.y += 6;
	}
	
	checkBoundaries(player, canvas);
	checkPaddleCollision(ball, player);
	
	ball.x += ballVx;
	ball.y += ballVy;

	// CEILING AND FLOOR BOUNCES (Keep these)
	if (ball.y <= 0) {
		ball.y = 0;
		ballVy *= -1;
	}
	if (ball.y + ball.height >= canvas.height) {
		ball.y = canvas.height - ball.height;
		ballVy *= -1;
	}

	// --- GOAL SCORING LOGIC (Replaced old left/right bounces) ---
	
	// Ball goes past Left Wall -> Player 2 Scores!
	if (ball.x + ball.width < 0) {
		p2Score += 1;
		document.getElementById('p2Score').innerText = p2Score;
		resetBall();
	}

	// Ball goes past Right Wall -> Player 1 Scores!
	if (ball.x > canvas.width) {
		p1Score += 1;
		document.getElementById('p1Score').innerText = p1Score;
		resetBall();
	}

	player.drawRect(ctx);
	ball.drawCircle(ctx);

	// Canvas-based text tracking historical match wins
	ctx.font = "20px Georgia";
	ctx.fillStyle = "black";
	ctx.fillText("Player 1 Wins: " + p1Wins, 20, 40);
	ctx.fillText("Player 2 Wins: " + p2Wins, canvas.width - 170, 40);
}

function resetBall() {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ballVx = (ballVx > 0) ? -4 : 4; // Serve to the player who lost the point
	ballVy = 2; // Add a bit of vertical speed so it doesn't move perfectly flat
}