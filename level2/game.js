var canvas;
var context;
var timer;
var interval = 1000/60;
var player;
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
	ball.drawCircle(context);
}
