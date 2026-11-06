// Global tracking object for all keys currently held down
const keysPressed = {};

window.addEventListener('keydown', function(event) {
    // Standardize to lowercase so 'A' and 'a' both work
    const key = event.key.toLowerCase();
    keysPressed[key] = true;
});

window.addEventListener('keyup', function(event) {
    const key = event.key.toLowerCase();
    keysPressed[key] = false;
});

// Expose the global Controls object that game.js is trying to use
window.Controls = {
    isPressed: function(keyName) {
        // Standardize input names to lowercase to match our tracking system
        const key = keyName.toLowerCase();
        
        // Handle Arrow key conversion to match your game.js syntax
        if (key === 'arrowleft') return !!keysPressed['arrowleft'];
        if (key === 'arrowright') return !!keysPressed['arrowright'];
        
        return !!keysPressed[key];
    }
};