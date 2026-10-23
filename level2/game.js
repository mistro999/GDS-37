var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var player1 = new GameObject("Player", 30, 180, 20, 100, "#5D3FD3");

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player1.drawRect(ctx); 
}

setInterval(animate, 1000 / 60);