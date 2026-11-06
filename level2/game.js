var canvas;
var context;
var timer;
var interval = 1000/60;
var player;

// 1. ADDED: Global Variable for Ric Flair's image
var img = document.getElementById("ric");

canvas = document.getElementById("gameCanvas");
context = canvas.getContext("2d");	

player = new GameObject("Player", 30, 180, 20, 100, "#5D3FD3");

timer = setInterval(animate, interval);

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	if(keysPressed.w)
	{
		player.y -= 6;
	}
	if(keysPressed.s)
	{
		player.y += 6;
	}
	
	checkBoundaries(player, canvas);
	checkPaddleCollision(ball, player); // Added to process the collision detection
	
	ball.x += ballVx;
	ball.y += ballVy;

	if (ball.x <= 0 || ball.x >= canvas.width) {
		ballVx *= -1;
	}
	if (ball.y <= 0 || ball.y >= canvas.height) {
		ballVy *= -1;
	}

	player.drawRect(context);

	// modified the sizing and centering math for Ric Flair's face
	var scaleMultiplier = 1.25; // Scales him up slightly to bypass transparent borders
	var imgWidth = (ball.radius * 2) * scaleMultiplier;
	var imgHeight = (ball.radius * 2) * scaleMultiplier;

	var imgX = ball.x - (imgWidth / 2);
	var imgY = ball.y - (imgHeight / 2);

	// 3. ADDED: Draw the Ric Flair image onto the canvas
	context.drawImage(img, imgX, imgY, imgWidth, imgHeight);
}