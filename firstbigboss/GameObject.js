class GameObject {
    constructor(x, y, width, height, color = "#ffffff") {
        // Coordinate System & Dimensions
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        // Velocity (Speed + Direction Vectors)
        this.vx = 0;
        this.vy = 0;

        // Physics Modifiers
        this.gravity = 0;
        this.frictionX = 1; // 1 means zero friction/slide forever
        this.frictionY = 1;
        this.accelerationX = 0;
        this.accelerationY = 0;
    }

    // Process forces and move the object across the coordinate system
    update() {
        // Apply acceleration or gravity pull forces
        this.vx += this.accelerationX;
        this.vy += this.accelerationY + this.gravity;

        // Apply environmental friction dampening
        this.vx *= this.frictionX;
        this.vy *= this.frictionY;

        // Shift positions on coordinates
        this.x += this.vx;
        this.y += this.vy;
    }

    // Default box render state
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Bounding Box Edge Getters for crisp math expressions
    get left() { return this.x; }
    get right() { return this.x + this.width; }
    get top() { return this.y; }
    get bottom() { return this.y + this.height; }

    // Axis-Aligned Bounding Box (AABB) Collision Detection Engine
    collidesWith(obj) {
        return (this.right > obj.left &&
                this.left < obj.right &&
                this.bottom > obj.top &&
                this.top < obj.bottom);
    }
}