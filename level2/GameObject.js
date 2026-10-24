function GameObject(name, x, y, width, height, color) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width || 20;   
    this.height = height || 100; 
    this.color = color || "#5D3FD3"; // Automatically defaults to purple
}

// Fixed: This prototype syntax allows game.js to access the method properly
GameObject.prototype.drawRect = function(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
};

GameObject.prototype.drawCircle = function(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, 10, 0, Math.PI * 2);
    context.closePath();
    context.fill();
};s