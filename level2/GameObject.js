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

  this.top = function() {
    return this.y;
  };
  this.bottom = function() {
    return this.y + this.height;
  };
  this.left = function() {
    return this.x;
  };
  this.right = function() {
    return this.x + this.width;
  };

  this.intersects = function(other) {
    return this.left() < other.right() &&
           this.right() > other.left() &&
           this.top() < other.bottom() &&
           this.bottom() > other.top();
  };
}

function checkBoundaries(object, canvas) {
  if (object.top() < 0) {
    object.y = 0;
  }
  if (object.bottom() > canvas.height) {
    object.y = canvas.height - object.height;
  }
}

var keysPressed = { w: false, s: false };
addEventListener('keydown', function(event) {
  if (event.key === 'w' || event.key === 'W') { keysPressed.w = true; }
  if (event.key === 's' || event.key === 'S') { keysPressed.s = true; }
});
addEventListener('keyup', function(event) {
  if (event.key === 'w' || event.key === 'W') { keysPressed.w = false; }
  if (event.key === 's' || event.key === 'S') { keysPressed.s = false; }
});

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var paddle = new GameObject("Player", 30, 180, 20, 100, "#6042d6");
var ball = new GameObject("Ball", 400, 220, 20, 20, "#6042d6");

var ballVx = -4; 
var ballVy = 0;  

function animationLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (keysPressed.w) { paddle.y -= 5; }
  if (keysPressed.s) { paddle.y += 5; }
  checkBoundaries(paddle, canvas);

  ball.x += ballVx;
  ball.y += ballVy;

  if (ball.intersects(paddle)) {
    var ballCenterY = ball.y + (ball.height / 2);
    var paddleThird = paddle.height / 3;

    if (ballCenterY < paddle.top() + paddleThird) {
      ballVx = 4;   
      ballVy = -4;  
    } 
    else if (ballCenterY > paddle.top() + (paddleThird * 2)) {
      ballVx = 4;   
      ballVy = 4;   
    } 
    else {
      ballVx *= -1; 
    }
    
    ball.x = paddle.right(); 
  }

  if (ball.top() < 0) {
    ball.y = 0;        
    ballVy = -ballVy;  
  }
  
  if (ball.bottom() > canvas.height) {
    ball.y = canvas.height - ball.height; 
    ballVy = -ballVy;                     
  }

  if (ball.right() > canvas.width) {
    ball.x = canvas.width - ball.width;
    ballVx *= -1;
  }

  if (ball.right() < 0) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ballVx = -4; 
    ballVy = 0; 
  }

  paddle.drawRect(context);
  ball.drawCircle(context);

  requestAnimationFrame(animationLoop);
}

requestAnimationFrame(animationLoop);