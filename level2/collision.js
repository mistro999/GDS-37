// collision.js

// SEPARATE FUNCTION: Call this ONLY on the paddle inside your animation loop
function checkBoundaries(object, canvas) {
    if (object.y < 0) {
        object.y = 0;
    }
    if (object.y + object.height > canvas.height) { 
        object.y = canvas.height - object.height;
    }
    // Note: Do NOT add an object.x check here, or the ball will get stuck!
}

// SEPARATE FUNCTION: Call this on the ball and paddle inside your animation loop
function checkPaddleCollision(ball, paddle) {
    if (ball.x < paddle.x + paddle.width &&
        ball.x + ball.width > paddle.x &&
        ball.y < paddle.y + paddle.height &&
        ball.y + ball.height > paddle.y) {

        // 1. Swapped to horizontal inversion so it bounces off a side paddle
        ballVx *= -1; 
        
        // 2. Changed from y-snapping to x-snapping to prevent the ball from glitching to the top
        ball.x = paddle.x + paddle.width; 
    }
}