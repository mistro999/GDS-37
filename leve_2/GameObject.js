function GameObject(name, x, y, width, height, color) {
    this.name = name;
    this.x = x;
    this.y = y;
    
    // Automatically sets small dimensions if it's the ball, otherwise defaults to paddle dimensions
    if (name === "Ball" || name === "ball") {
        this.width = width || 20;
        this.height = height || 20;
    } else {
        this.width = width || 20;   
        this.height = height || 100; 
    }
    
    this.color = color || "#5D3FD3"; 
}

GameObject.prototype.drawRect = function(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
};

GameObject.prototype.drawCircle = function(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, 10, 0, Math.PI * 2);
    context.closePath();
    context.fill();
};

function checkBoundaries(object, canvas)
{
	if (object.y < 0) 
	{
		object.y = 0;
	}
	if (object.y + object.height > canvas.height) 
	{ 
		object.y = canvas.height - object.height;
	}
}

var keysPressed = {
    w: false,
    s: false
};

window.addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'W') {
        keysPressed.w = true;
    }
    if (event.key === 's' || event.key === 'S') {
        keysPressed.s = true;
    }
});

window.addEventListener('keyup', function(event) {
    if (event.key === 'w' || event.key === 'W') {
        keysPressed.w = false;
    }
    if (event.key === 's' || event.key === 'S') {
        keysPressed.s = false;
    }
});

var canvas;
var context;
var timer;
var interval = 1000/60;
var player;

canvas = document.getElementById("gameCanvas");
context = canvas.getContext("2d");	

player = new GameObject("Player", 30, 180, 20, 100, "#5D3FD3");
var ball = new GameObject("Ball", 200, 100, 20, 20, "#5D3FD3");

var ballVx = 4;
var ballVy = 4;

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