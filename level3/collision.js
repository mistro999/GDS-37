function checkPaddleCollision(ball, paddle) {
    // Check if collision occurs (AABB bounding box)
    if (ball.x < paddle.x + paddle.width &&
        ball.x + ball.width > paddle.x &&
        ball.y < paddle.y + paddle.height &&
        ball.y + ball.height > paddle.y) {

        // Find the center of the ball relative to the top of the paddle
        var ballCenterY = ball.y + (ball.height / 2);

        // If the paddle is on the left half of the screen, bounce right (positive).
        // If the paddle is on the right half, bounce left (negative).
        var directionX = (paddle.x < canvas.width / 2) ? 1 : -1;

        // Ball hits top third
        if (ballCenterY < paddle.y + (paddle.height / 3)) {
            ballVx = 4 * directionX; 
            ballVy = -4;             
        }
        // Ball hits lower third
        else if (ballCenterY > paddle.y + (paddle.height / 3 * 2)) {
            ballVx = 4 * directionX; 
            ballVy = 4;             
        }
        // Ball hits middle third (Normal bounce)
        else {
            ballVx *= -1;         
            // ballVy stays exactly as it is so the ball keeps moving around!
        }
        
        // Push the ball out of the paddle depending on which side it hit
        if (directionX === 1) {
            ball.x = paddle.x + paddle.width;  
        } else {
            ball.x = paddle.x - ball.width;
        }
    }
}