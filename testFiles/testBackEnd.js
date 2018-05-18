var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

document.body.style.backgroundImage = "url('tableTopBackground.jpg')";


ctx.beginPath();
ctx.rect(0, 0, 400, 220);
ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
ctx.fill();
ctx.globalCompositeOperation='destination-out';

document.getElementById("canvas").onmousedown = function() {
    mouseDown = 1;
};

document.getElementById("canvas").onmouseup = function() {
    mouseDown = 0;
};

document.getElementById("canvas").onmousemove = function() {
    
        var mouseX = event.pageX;
        var mouseY = event.pageY;

        if (mouseDown === 1) {
        ctx.beginPath();
        ctx.arc(mouseX,mouseY,50,0,2*Math.PI);
        ctx.stroke();
        
        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fill();}
    
};