function checkPaddleCollision(ball, paddle) {
    // Check if collision occurs
    if (ball.x < paddle.x + paddle.width &&
        ball.x + ball.width > paddle.x &&
        ball.y < paddle.y + paddle.height &&
        ball.y + ball.height > paddle.y) {

        // Find the center of the ball relative to the top of the paddle
        var ballCenterY = ball.y + (ball.height / 2);

        // Ball hits top third
        if (ballCenterY < paddle.y + (paddle.height / 3)) {
            ballVx = 4;   // Positive speed (moves right)
            ballVy = -4; 
        }
        // Ball hits lower third
        else if (ballCenterY > paddle.y + (paddle.height / 3 * 2)) {
            ballVx = 4;   // Positive speed (moves right)
            ballVy = 4;   // Positive speed (moves down)
        }
        // Ball hits middle third (Normal bounce)
        else {
            ballVx *= -1;
            // ballVy stays exactly as it is so the ball keeps moving around!
        }
        
        // Push the ball out of the paddle so it doesn't get stuck
        ball.x = paddle.x + paddle.width; 

        // --- ADD THESE TWO LINES TO UPDATE THE SCOREBOARD ---
        score += 1; // Increase the global score counter by 1
        document.getElementById('score').innerText = score; // Send the new score to your HTML
    }
}