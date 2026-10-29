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

// Bounding Box collision method
function checkPaddleCollision(ball, paddle) {
    if (ball.x < paddle.x + paddle.width &&
        ball.x + ball.width > paddle.x &&
        ball.y < paddle.y + paddle.height &&
        ball.y + ball.height > paddle.y) {

        ballVy *= -1; 
        
        // Prevent clipping by snapping the ball right above the paddle
        ball.y = paddle.y - ball.height; 
    }
}

// 2. Completed animation loop with the conditional check
function animationLoop() {
    // Clear the screen for the new frame
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Move the ball
    ball.x += ballVx;
    ball.y += ballVy;
    
    // Check for collisions using your conditional statements
    checkPaddleCollision(ball, paddle);
    checkBoundaries(ball, canvas);
    
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    // Keep the animation looping
    requestAnimationFrame(animationLoop);
}
