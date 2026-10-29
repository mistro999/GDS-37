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

    // Dynamic methods returning each side
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

    // Axis-Aligned Bounding Box (AABB) collision detection
    this.collidesWith = function(other) {
        return this.left() < other.right() &&
               this.right() > other.left() &&
               this.top() < other.bottom() &&
               this.bottom() > other.top();
    };

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
}

function checkBoundaries(object, canvas) {
    if (object.y < 0) {
        object.y = 0;
    }
    if (object.y + object.height > canvas.height) {
        object.y = canvas.height - object.height;
    }
}

function updateEdges(object) {
    // Keep this helper functional if other code depends on static properties,
    // though the new side functions run dynamically.
    object.staticTop = object.y;
    object.staticBottom = object.y + object.height;
    object.staticLeft = object.x;
    object.staticRight = object.x + object.width;
}

var keysPressed = { w: false, s: false };

addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'W') {
        keysPressed.w = true;
    }
    if (event.key === 's' || event.key === 'S') {
        keysPressed.s = true;
    }
});

addEventListener('keyup', function(event) {
    if (event.key === 'w' || event.key === 'W') {
        keysPressed.w = false;
    }
    if (event.key === 's' || event.key === 'S') {
        keysPressed.s = false;
    }
});

var canvas;
var context;
var interval = 1000/60;
var player;

canvas = document.getElementById("gameCanvas");
context = canvas.getContext("2d");

player = new GameObject("Player", 30, 180, 20, 100, "#6042d6");
var ball = new GameObject("Ball", 200, 100, 20, 20, "#6042d6");
var ballVx = 4;
var ballVy = 4;

// The animate function containing paddle movement, wall limits, and collision physics
function animate() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Move player paddle
    if (keysPressed.w) {
        player.y -= 5;
    }
    if (keysPressed.s) {
        player.y += 5;
    }
    checkBoundaries(player, canvas);

    // Move ball
    ball.x += ballVx;
    ball.y += ballVy;

    // Bounce ball off top and bottom screen walls
    if (ball.top() <= 0 || ball.bottom() >= canvas.height) {
        ballVy = -ballVy;
    }

    // Bounce ball off right screen wall (assuming single-player practice style)
    if (ball.right() >= canvas.width) {
        ballVx = -ballVx;
    }

    // Ball bounces off the paddle using the bounding box collision method
    if (ball.collidesWith(player)) {
        // Reverse direction
        ballVx = -ballVx;
        // Shift ball to front edge of paddle to prevent sticky duplicate hits
        ball.x = player.right();
    }

    // Reset ball if it slips past the player paddle on the left wall
    if (ball.left() <= 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ballVx = 4; 
    }

    // Render game frames
    player.drawRect(context);
    ball.drawCircle(context);
}

// Start the game animation loop
var timer = setInterval(animate, interval);
