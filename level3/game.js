var canvas;
var context;
var timer;
var p1Wins = 0;
var p2Wins = 0;
var interval = 1000/60;
var player;

canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");	

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
	checkPaddleCollision(ball, player);
	
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

	ctx.font = "20px Georgia";
	ctx.fillStyle = "black";
	ctx.fillText("Player 1 Wins: " + p1Wins, 20, 20);
	ctx.fillText("Player 2 Wins: " + p2Wins, canvas.width - 150, 20);
}
	function resetBall() {
		ball.x = canvas.width / 2;
		ball.y = canvas.height / 2;
		ballVx *= -1;
}