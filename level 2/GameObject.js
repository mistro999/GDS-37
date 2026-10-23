function GameObject(name, x, y, z) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
}   this.color = color || "#000000";
    this.drawcircle(context);
    this.move();       
            requestAnimationFrame(animate);

         animate();
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
        var player1 = new gameObject("Player 1", 0, 0, 0);

 Ball.prototype.draw = function(context) {
            context.save();
            
            context.translate(this.x, this.y);
            
            context.beginPath();
            
            var radius = this.width / 2;
            var startAngle = 0;
            var endAngle = 360 * Math.PI / 180;
            
            context.arc(0, 0, radius, startAngle, endAngle, true);
            
            context.closePath();
            
            context.fillStyle = this.color;
            context.fill();
            
            context.restore();
        };

        Ball.prototype.move = function() 
            this.x += this.vx;
            this.y += this.vy;

            var radius = this.width / 2;
            if (this.x - radius < 0 || this.x + radius > canvas.width) {
                this.vx *= -1;
            }
            if (this.y - radius < 0 || this.y + radius > canvas.height) {
                this.vy *= -1;
            }

        var ball = new Ball(300, 200, 60, 60, "deepskyblue", 1, 4, 3);