var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;

drawClock();
setInterval(drawClock,1000);

function drawClock() {
    drawFace();
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(){
    var grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
   
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0,"#333");
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx,radius){
    var ang;
    var num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num <= 12; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    var now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();
        
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);

    minute = (minute*Math.PI/30) + (second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.75, radius*0.05);
   
    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*.02);
}

function drawHand(ctx, pos, length, width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// clock Script

Number.prototype.pad = function (n) {
    for (var r = this.toString(); r.length < n; r = 0 + r);
    return r;
};

function updateClock() {
    var now = new Date();
    var milli = now.getMilliseconds(),
        sec = now.getSeconds(),
        min = now.getMinutes(),
        hou = now.getHours(),
        mo = now.getMonth(),
        dy = now.getDate(),
        yr = now.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var tags = ["mon", "d", "y", "h", "m", "s", "mi"],
        corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli];
    for (var i = 0; i < tags.length; i++)
        document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()", 1);
}

// Clock Script End