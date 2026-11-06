function GameObject(name, x, y, width, height, color, image) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color || "#6042d6";
    this.image = image;
    if (name === "Ball" || name === "ball") {
        this.width = width || 20;
        this.height = height || 20;
    } else {
        this.width = width || 20;
        this.height = height || 100;
    }
    this.drawRect = function (context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    
    this.drawImage = function (context) {
        if (this.image) {
            // modified sizing and centering math for Ric Flair's face
            var scaleMultiplier = 1.25; // Scales him up slightly to bypass transparent borders
            var imgWidth = (this.radius * 2) * scaleMultiplier;
            var imgHeight = (this.radius * 2) * scaleMultiplier;

            var imgX = this.x - (imgWidth / 2);
            var imgY = this.y - (imgHeight / 2);

            // 3. ADDED: Draw the Ric Flair image onto the canvas
            context.drawImage(img,this.x - 100/2,this.y - 100/2,100, 100);
        }
    }

    this.drawCircle = function (context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    };
    this.top = function () { return this.y; };
    this.bottom = function () { return this.y + this.height; };
    this.left = function () { return this.x; };
    this.right = function () { return this.x + this.width; };
    this.intersects = function (other) {
        return this.left() < other.right() && this.right() > other.left() && this.top() < other.bottom() && this.bottom() > other.top();
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

var keysPressed = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
};

addEventListener('keydown', function (event) {
    if (event.key === 'w' || event.key === 'W') { keysPressed.w = true; }
    if (event.key === 's' || event.key === 'S') { keysPressed.s = true; }
    if (event.key === 'ArrowUp') { keysPressed.ArrowUp = true; }
    if (event.key === 'ArrowDown') { keysPressed.ArrowDown = true; }
});

addEventListener('keyup', function (event) {
    if (event.key === 'w' || event.key === 'W') { keysPressed.w = false; }
    if (event.key === 's' || event.key === 'S') { keysPressed.s = false; }
    if (event.key === 'ArrowUp') { keysPressed.ArrowUp = false; }
    if (event.key === 'ArrowDown') { keysPressed.ArrowDown = false; }
});

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");


var img = document.getElementById("ric");


var paddle = new GameObject("Player1", 30, 180, 20, 100, "#6042d6");
var paddle2 = new GameObject("Player2", canvas.width - 50, 180, 20, 100, "#6042d6");
var ball = new GameObject("Ball", 400, 220, 20, 20, "#6042d6", img);

var ballVx = -4;
var ballVy = 0;

function animationLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (keysPressed.w) { paddle.y -= 5; }
    if (keysPressed.s) { paddle.y += 5; }
    if (keysPressed.ArrowUp) { paddle2.y -= 5; }
    if (keysPressed.ArrowDown) { paddle2.y += 5; }

    checkBoundaries(paddle, canvas);
    checkBoundaries(paddle2, canvas);

    ball.x += ballVx;
    ball.y += ballVy;

    if (ball.intersects(paddle)) {
        var ballCenterY = ball.y + (ball.height / 2);
        var paddleThird = paddle.height / 3;
        if (ballCenterY < paddle.top() + paddleThird) {
            ballVx = 4;
            ballVy = -4;
        } else if (ballCenterY > paddle.top() + (paddleThird * 2)) {
            ballVx = 4;
            ballVy = 4;
        } else {
            ballVx = 4;
        }
        ball.x = paddle.right();
    }

    if (ball.intersects(paddle2)) {
        var ballCenterY = ball.y + (ball.height / 2);
        var paddleThird = paddle2.height / 3;
        if (ballCenterY < paddle2.top() + paddleThird) {
            ballVx = -4;
            ballVy = -4;
        } else if (ballCenterY > paddle2.top() + (paddleThird * 2)) {
            ballVx = -4;
            ballVy = 4;
        } else {
            ballVx = -4;
        }
        ball.x = paddle2.left() - ball.width;
    }

    if (ball.top() < 0) {
        ball.y = 0;
        ballVy = -ballVy;
    }
    if (ball.bottom() > canvas.height) {
        ball.y = canvas.height - ball.height;
        ballVy = -ballVy;
    }

    if (ball.right() < 0 || ball.left() > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ballVx = (ball.left() > canvas.width) ? -4 : 4;
        ballVy = 0;
    }


    context.strokeStyle = "#000000";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();



    paddle.drawRect(context);
    paddle2.drawRect(context);
    ball.drawCircle(context);
    ball.drawImage(context); // Draw the Ric Flair image instead of the ball



    requestAnimationFrame(animationLoop);
}

requestAnimationFrame(animationLoop);