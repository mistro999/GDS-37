//Declare my variables
var canvas;
var context;
var timer;
var interval;
var player;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

player = new GameObject({x:150});

platform0 = new GameObject();
	platform0.width = 150;
	platform0.x = platform0.width/2;
	platform0.y = player.y + player.height/2 + platform0.height/2;
	platform0.color = "#66ff33";
	
platform1 = new GameObject();
	platform1.width = 575;
	platform1.x = canvas.width - platform1.width/2;
	platform1.y = player.y + player.height/2 + platform1.height/2;
	platform1.color = "#66ff33";
	
goal = new GameObject({width:24, height:50, x:platform1.x + 100, y:platform1.y-100, color:"#00ffff"});

var fX = .85;
var fY = .97;
var gravity = 1;

interval = 1000/60;
timer = setInterval(animate, interval);

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	

	if(w && player.canJump && player.vy == 0)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
	}

	if(a)
	{
		player.vx += -player.ax * player.force;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
	}

	player.vx *= fX;
	player.vy *= fY;
	
	player.vy += gravity;
	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);
	
	// Platform 0 Collisions
	while(platform0.hitTestPoint(player.bottom()) && player.vy >= 0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint(player.left()) && player.vx <= 0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.right()) && player.vx >= 0)
	{
		player.x--;
		player.vx = 0;
	}
	
	// Platform 1 Collisions
	while(platform1.hitTestPoint(player.bottom()) && player.vy >= 0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform1.hitTestPoint(player.left()) && player.vx <= 0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform1.hitTestPoint(player.right()) && player.vx >= 0)
	{
		player.x--;
		player.vx = 0;
	}
	
	// Bottom-Left and Bottom-Right Hitpoints for Platform 0
	while(platform0.hitTestPoint({x: player.left().x, y: player.bottom().y}) && player.vy >= 0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint({x: player.right().x, y: player.bottom().y}) && player.vy >= 0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	
	// Bottom-Left and Bottom-Right Hitpoints for Platform 1
	while(platform1.hitTestPoint({x: player.left().x, y: player.bottom().y}) && player.vy >= 0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform1.hitTestPoint({x: player.right().x, y: player.bottom().y}) && player.vy >= 0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	
	if(player.hitTestObject(goal))
	{
		goal.y = 100000;
	}

	platform0.drawRect();
	platform1.drawRect();

	player.drawRect();
	
	// Call standard debug points
	player.drawDebug();
	
	// Manually draw the bottom-left and bottom-right debug points
	var size = 5;
	context.save();
	context.fillStyle = "black";
	context.fillRect(player.left().x - size/2, player.bottom().y - size/2, size, size);
	context.fillRect(player.right().x - size/2, player.bottom().y - size/2, size, size);
	context.restore();
	
	goal.drawCircle();
}