const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Global Score Tracker
let score = 0;

// --- SUBCLASSES EXTENDING GAMEOBJECT ---
class Paddle extends GameObject {
    constructor(x, y) {
        super(x, y, 160, 25, "#28b5b5"); // Cyan bar from target mockup
        this.frictionX = 0.85;           // Dampens side movement over time
        this.speed = 1.5;                // Force of input acceleration
    }

    update() {
        // Interrogate continuous key state matrices from Controls.js
        if (Controls.isPressed("ArrowLeft") || Controls.isPressed("a")) {
            this.accelerationX = -this.speed;
        } else if (Controls.isPressed("ArrowRight") || Controls.isPressed("d")) {
            this.accelerationX = this.speed;
        } else {
            this.accelerationX = 0; // Terminate engine drift acceleration force
        }

        super.update();

        // Canvas side boundary caps
        if (this.x < 0) { this.x = 0; this.vx = 0; }
        if (this.right > canvas.width) { this.x = canvas.width - this.width; this.vx = 0; }
    }
}

class Ball extends GameObject {
    constructor(x, y) {
        super(x, y, 35, 35, "#ff00ff"); // Magenta circle from layout target
        this.vx = 4;
        this.vy = -4;
        this.gravity = 0.15; // Continuous physical pull vector pushing down
    }

    update() {
        super.update();

        // Bounce vectors on standard vertical walls
        if (this.x < 0 || this.right > canvas.width) {
            this.vx *= -1;
            this.x = this.x < 0 ? 0 : canvas.width - this.width;
        }
        
        // Ceiling bounce
        if (this.y < 0) {
            this.vy *= -1;
            this.y = 0;
        }

        // Floor drop calculation / Game Reset condition
        if (this.bottom > canvas.height) {
            this.x = canvas.width / 2;
            this.y = 100;
            this.vy = -4;
            score = 0; // Wipe score matrix on bottom-out drop
        }
    }

    // Override square drawing profile to output as a circular mesh
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const radius = this.width / 2;
        ctx.arc(this.x + radius, this.y + radius, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- INITIALIZE GAME INSTANCE ENTITIES ---
const paddle = new Paddle(canvas.width / 2 - 80, canvas.height - 60);
const ball = new Ball(canvas.width - 120, 80);

// --- DESIGN DECORATION LAYERS ---
function drawTether() {
    // Find midpoint center arrays of both tracking bounding boxes
    const paddleCenterX = paddle.x + (paddle.width / 2);
    const paddleCenterY = paddle.y + (paddle.height / 2);
    const ballCenterX = ball.x + (ball.width / 2);
    const ballCenterY = ball.y + (ball.height / 2);

    ctx.strokeStyle = "#615c5c"; 
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(paddleCenterX, paddleCenterY);
    ctx.lineTo(ballCenterX, ballCenterY);
    ctx.stroke();
}

function drawScore() {
    ctx.fillStyle = "#ffffff";
    ctx.font = "16px sans-serif";
    ctx.fillText("Score: " + score, 40, 40);
}

// --- MAIN RUN LOOP SYSTEM ---
function animate() {
    // Wipe view window clean
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Perform positional engine physics updates
    paddle.update();
    ball.update();

    // Collision Engine
    if (ball.collidesWith(paddle)) {
        ball.vy *= -1.02;
        ball.y = paddle.top - ball.height;
        ball.vx += paddle.vx * 0.2;
        score++;
    }

    // Render graphics loop step
    drawTether();
    paddle.draw(ctx);
    ball.draw(ctx);
    drawScore();

    // Recursively draw incoming frame cycles
    requestAnimationFrame(animate);
}

// Run execution loop startup
animate();
