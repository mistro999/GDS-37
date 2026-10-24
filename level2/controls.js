var keysPressed = {
    w: false,
    s: false
};

window.addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'W') {
        keysPressed.w = true;
    }
    if (event.key === 's' || event.key === 'S') {
        keysPressed.s = true;
    }
});

window.addEventListener('keyup', function(event) {
    if (event.key === 'w' || event.key === 'W') {
        keysPressed.w = false;
    }
    if (event.key === 's' || event.key === 'S') {
        keysPressed.s = false;
    }
});
