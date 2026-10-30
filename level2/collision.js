function checkBoundaries(object, canvas) {
    if (object.y < 0) {
        object.y = 0;
    }
    if (object.y + object.height > canvas.height) { 
        object.y = canvas.height - object.height;
    }
}

function checkPaddleCollision(ball, paddle) {
    if (ball.x < paddle.x + paddle.width &&
        ball.x + ball.width > paddle.x &&
        ball.y < paddle.y + paddle.height &&
        ball.y + ball.height > paddle.y) {

        ballVx *= -1; 
        
        ball.x = paddle.x + paddle.width; 
    }
}