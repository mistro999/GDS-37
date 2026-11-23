//Declare my variables
var canvas;
var context;
var timer;
var interval;
var player;
var hasWon = false;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

player = new GameObject({x:100, y:canvas.height/2-100});

platform0 = new GameObject();
platform0.width = 200;
platform0.x = platform0.width/2;
platform0.y = canvas.height - platform0.height/2;
platform0.color = "#66ff33";

var platform1 = new GameObject({width: 140, height: 25, x: canvas.width * 0.36, y: canvas.height - 200, color: "#66ff33"});
var platform2 = new GameObject({width: 140, height: 25, x: canvas.width * 0.62, y: canvas.height - 340, color: "#66ff33"});
var platform3 = new GameObject({width: 140, height: 25, x: canvas.width * 0.78, y: 270, color: "#66ff33"});
var platform4 = new GameObject({width: 150, height: 25, x: canvas.width - 90, y: 175, color: "#66ff33"});

var platforms = [platform0, platform1, platform2, platform3, platform4];

goal = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#00ffff"});

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

	for(var i = 0; i < platforms.length; i++)
	{
		var plat = platforms[i];

		while(plat.hitTestPoint(player.bottom()) && player.vy >= 0)
		{
			player.y--;
			player.vy = 0;
			player.canJump = true;
		}
		while(plat.hitTestPoint(player.left()) && player.vx <= 0)
		{
			player.x++;
			player.vx = 0;
		}
		while(plat.hitTestPoint(player.right()) && player.vx >= 0)
		{
			player.x--;
			player.vx = 0;
		}
		while(plat.hitTestPoint(player.top()) && player.vy <= 0)
		{
			player.y++;
			player.vy = 0;
		}

		plat.drawRect();
	}
	
	if(player.hitTestObject(goal))
	{
		goal.y = 10000;
		hasWon = true;
	}

	if(hasWon)
	{
		context.font = "30px Arial";
		context.fillStyle = "black";
		context.textAlign = "center";
		context.fillText("You Win!!!", canvas.width/2, canvas.height/2);
	}

	player.drawRect();
	goal.drawCircle();
}