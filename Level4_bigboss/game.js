// Declare variables
var canvas;
var context;
var timer;
var interval;
var player;
var hasWon = false;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

// Player setup
player = new GameObject({ x: 100, y: canvas.height / 2 - 100 });

// Platforms
var platform0 = new GameObject();
platform0.width = 200;
platform0.x = platform0.width / 2;
platform0.y = canvas.height - platform0.height / 2;
platform0.color = "#66ff33";

var platform1 = new GameObject({ width: 140, height: 25, x: canvas.width * 0.36, y: canvas.height - 200, color: "#66ff33" });
var platform2 = new GameObject({ width: 140, height: 25, x: canvas.width * 0.62, y: canvas.height - 340, color: "#66ff33" });
var platform3 = new GameObject({ width: 140, height: 25, x: canvas.width * 0.78, y: 270, color: "#66ff33" });
var platform4 = new GameObject({ width: 150, height: 25, x: canvas.width - 90, y: 175, color: "#66ff33" });

var platforms = [platform0, platform1, platform2, platform3, platform4];

// --- GAME MECHANIC VARIABLES ---
// 1. Dash Mechanic (Press Space)
var dashSpeed = 28;
var dashCooldown = 0;

// 2. Bounce Pad Mechanic
var bouncePad = new GameObject({
    width: 50,
    height: 15,
    x: platform1.x,
    y: platform1.y - platform1.height / 2 - 7.5,
    color: "#ff9900"
});
// -------------------------------

// Goal
var goal = new GameObject({ width: 24, height: 50, x: canvas.width - 50, y: 100, color: "#00ffff" });

var fX = 0.85;
var fY = 0.97;
var gravity = 1;

interval = 1000 / 60;
timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Jump
    if (w && player.canJump && player.vy == 0) {
        player.canJump = false;
        player.vy += player.jumpHeight;
    }

    // Left / Right movement & facing direction
    if (a) {
        player.vx += -player.ax * player.force;
        player.facing = -1;
    }
    if (d) {
        player.vx += player.ax * player.force;
        player.facing = 1;
    }

    // --- GAME MECHANIC LOGIC ---
    // Dash activation & cooldown
    if (dashCooldown > 0) {
        dashCooldown--;
    }
    if (space && dashCooldown === 0) {
        player.vx = dashSpeed * player.facing;
        player.vy = 0;
        dashCooldown = 45; // 45 frames (~0.75 seconds) cooldown
    }

    // Bounce pad trigger
    if (player.hitTestObject(bouncePad)) {
        player.vy = -34;
        player.canJump = false;
    }
    // ---------------------------

    // Apply friction and gravity
    player.vx *= fX;
    player.vy *= fY;
    player.vy += gravity;

    player.x += Math.round(player.vx);
    player.y += Math.round(player.vy);

    // Keep player inside left/right canvas walls
    if (player.left().x < 0) {
        player.x = player.width / 2;
        player.vx = 0;
    }
    if (player.right().x > canvas.width) {
        player.x = canvas.width - player.width / 2;
        player.vx = 0;
    }

    // Platform collisions
    for (var i = 0; i < platforms.length; i++) {
        var plat = platforms[i];

        while (plat.hitTestPoint(player.bottom()) && player.vy >= 0) {
            player.y--;
            player.vy = 0;
            player.canJump = true;
        }
        while (plat.hitTestPoint(player.left()) && player.vx <= 0) {
            player.x++;
            player.vx = 0;
        }
        while (plat.hitTestPoint(player.right()) && player.vx >= 0) {
            player.x--;
            player.vx = 0;
        }
        while (plat.hitTestPoint(player.top()) && player.vy <= 0) {
            player.y++;
            player.vy = 0;
        }

        plat.drawRect();
    }

    // Goal check
    if (player.hitTestObject(goal)) {
        goal.y = 10000;
        hasWon = true;
    }

    // Draw mechanic objects, player, and goal
    bouncePad.drawRect();
    player.drawRect();
    goal.drawCircle();

    // HUD: Dash status
    context.font = "16px Arial";
    context.fillStyle = "#333333";
    context.textAlign = "left";
    context.fillText(dashCooldown === 0 ? "Dash [SPACE]: Ready" : "Dash [SPACE]: Recharging...", 15, 25);

    // Win message
    if (hasWon) {
        context.font = "30px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("You Win!!!", canvas.width / 2, canvas.height / 2);
    }
}