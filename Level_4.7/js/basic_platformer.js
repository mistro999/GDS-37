//Declare my variables
var canvas;
var context;
var timer;
var interval;
var player;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

player = new GameObject({x:300, y:canvas.height/2-100});

platform0 = new GameObject();
	platform0.width = canvas.width-300;
	platform0.x = platform0.width/2;
	platform0.color = "#66ff33";
	
platform1 = new GameObject();
	platform1.x = 500;
	platform1.y = platform0.y - platform0.height/2 - platform1.height/2;
	platform1.color = "#ffff00";
	
platform2 = new GameObject();
	platform2.width = canvas.width-300;
	platform2.x = platform0.width/2;
	platform2.color = "#66ff33";
	platform2.y = platform0.y - 200;

goal = new GameObject({width:24, height:50, x:700, y:platform0.y-100, color:"#00ffff"});

var fX = .85;
var fY = .97;
var gravity = 1;
var hasItem = false;

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

	// Floor collisions
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
	while(platform0.hitTestPoint(player.top()) && player.vy <= 0)
	{
		player.y++;
		player.vy = 0;
	}

	// Ceiling collisions
	while(platform2.hitTestPoint(player.top()) && player.vy <= 0)
	{
		player.y++;
		player.vy = 0;
	}
	while(platform2.hitTestPoint(player.bottom()) && player.vy >= 0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform2.hitTestPoint(player.left()) && player.vx <= 0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform2.hitTestPoint(player.right()) && player.vx >= 0)
	{
		player.x--;
		player.vx = 0;
	}
	
	// Trigger pickup once on contact
	if(platform1.hitTestPoint(player.right()) || platform1.hitTestPoint(player.left()) || platform1.hitTestPoint({x:player.x, y:player.y}))
	{
		hasItem = true;
	}

	// Keep the yellow square locked behind the player
	if(hasItem)
	{
		platform1.x = player.x;
		platform1.y = player.y;
		platform1.width = 25;
		platform1.height = 25;
	}

	// Collect the pearl
	if(player.hitTestObject(goal))
	{
		goal.y = 10000;
	}
	
	platform0.drawRect();
	platform2.drawRect();
	platform1.drawRect(); // Drawn before player so no yellow shows once picked up
	player.drawRect();
	
	//Show hit points
	player.drawDebug();
	goal.drawCircle();
}