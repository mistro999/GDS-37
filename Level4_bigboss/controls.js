// Keyboard state variables
var w = false;
var a = false;
var s = false;
var d = false;
var space = false;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

function press(e) {
    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
        w = true;
    }
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        a = true;
    }
    if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
        s = true;
    }
    if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        d = true;
    }
    if (e.code === "Space") {
        space = true;
    }
}

function release(e) {
    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
        w = false;
    }
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        a = false;
    }
    if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
        s = false;
    }
    if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        d = false;
    }
    if (e.code === "Space") {
        space = false;
    }
}