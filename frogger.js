window.onload = initAll;
{//random
var canvas;
var ctx;
var x = 180;
var y = 420;
var x1;
var y1;
var scoreD = 0;
var xspeed = 0;
var yspeed = 0;
}
{ //scoring
    var scoringB = false;
    var level = 1;
}
{//key pressed
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
}
{//pt 2
var up = true;
var down = true;
var right = true;
var left = true;
}
{// array
var xpos1 = [0, 450, 100, 500, 50, 400];
var ypos1 = [62, 112, 212, 262, 362, 412];
var speedcar = [2,-2,3,-2,2,-2];
}
{//interval
var interval;
}
{ //color count
    var count = true;
    var r1=50;
    var r2=50;
    var r3=50;
}
{ //question variables
    var coefficient = Math.floor((Math.random() * 10)+1);
    var power = Math.floor((Math.random() * 8)+1);
    var constant = Math.floor((Math.random() * 10)+1);
    var questionAnswered = false;
}
function initAll()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    x+=canvas.offsetLeft;
    y+=canvas.offsetTop;
    imgObj = document.getElementById('myImage');
    imgObj.style.position = 'absolute';
    imgObj.style.top = y+'px'; 
    imgObj.style.left = x+'px'; 
    imgObj.style.visibility='visible';
    document.addEventListener("keydown",keyDownHandler,false);
    document.addEventListener("keyup",keyUpHandler,false);
    document.addEventListener("mouseup", mouseUpHandler, false);
    interval = setInterval(play,10);
    play();
}
function play()
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
    questionAnswered = false;
    drawboard();
    drawFrog();
    moveFrog();
    drawCars();
    moveCars();
    collision();
    score();
}
function collision()
{
    for(var i = 0; i < xpos1.length; i++)
    {
        if(x-canvas.offsetLeft<xpos1[i]+38 && x-canvas.offsetLeft+30>=xpos1[i] && y-canvas.offsetTop<=ypos1[i]+35 && y-canvas.offsetTop+35>=ypos1[i] && y-canvas.offsetTop+32>=ypos1[i])
        {
            x = 180+canvas.offsetLeft;
            y = 460+canvas.offsetTop;
            imgObj.style.visibility = 'hidden'; //hides image for the calculus question
            clearInterval(interval); 
            interval = setInterval(setQuestion,5); //sets the interval to set question
            setQuestion(); //calls the set question method
        }
    }
}
function setQuestion()
{
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,500,500);

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Impact";
    generate();
    if(questionAnswered==true)
    {
        clearInterval(interval);
        interval = setInterval(play, 10);
        imgObj.style.visibility = 'visible';
        //reset();
    }
}
function reset()
{
    level = 1;
    score = 0;
    ctx.fillText("Score: " + scoreD, 45, 40);
    ctx.fillText("Level: " + level, 200,40);
    speedcar = [2,-2, 3, -2, 2, -2];
}
function generate()
{
    var ans = [answer, fal1, fal2, fal3];
    var answer = power+"("+(coefficient) + "x" + " + " + constant + ")" + "^" + (power-1) + " * " + coefficient;
    var fal1 = power+"("+(coefficient) + "x" + " + " + constant + ")" + "^" + (power-1);
    var fal2 = (power-1)+"("+(coefficient) + "x" + " + " + constant + ")" + "^" + (power) + " + " + coefficient;
    var fal3 = (coefficient) + "x" + " + " + constant + "^" + (power-1) + " + " + coefficient;

    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Impact";
    ctx.fillText( "Question: "+"("+(coefficient)+"x"+ " + " + constant + ")" + "^"+ power, 110, 30);
    ctx.fillText("A) "+answer, 110, 100);
    ctx.fillText("B) "+fal1, 110, 150);
    ctx.fillText("C) "+fal2,110, 200);
    ctx.fillText("D) "+fal3, 110, 250);
}
function drawCars()
{
    if(count==true)
    {
        r1 = Math.floor(Math.random()*255);
        r2 = Math.floor(Math.random()*255);
        r3 = Math.floor(Math.random()*255);
        
        count=false;
    }
    for(var i = 0; i < xpos1.length; i++)
    {
        ctx.fillStyle = "rgb("+r1+","+r2+"," +r3+")";
        ctx.fillRect(xpos1[i], ypos1[i], 45, 35);
        if(xpos1[i] >= 500)
        {
            xpos1[i] = -40;
        }
        else if(xpos1[i] <= -50)
        {
            xpos1[i] = 400;
        }
    }
}
function moveCars()
{
    for(var i = 0; i < xpos1.length; i++)
    {
        xpos1[i] = xpos1[i] + speedcar[i];
    }
}
function drawboard()
{

     //safe zones
     ctx.fillStyle = "lime";
     ctx.fillRect(0,300, 500, 45);
     ctx.fillRect(0,150, 500, 45);

     //start zone
     ctx.fillStyle = "black";
     ctx.fillRect(0,450, 500, 50);

     //end
     ctx.fillStyle = "black";
     ctx.fillRect(0,0, 500, 50);
 
     //car lane1 
     ctx.beginPath();
     ctx.moveTo(0, 250);
     ctx.lineTo(500, 250);
     ctx.strokeStyle = "white";
     ctx.setLineDash([5]);
     ctx.strokeWidth = 2;
     ctx.stroke();
 
     //car lane2
     ctx.beginPath();
     ctx.moveTo(0, 100);
     ctx.lineTo(500, 100);
     ctx.strokeStyle = "white";
     ctx.setLineDash([5]);
     ctx.strokeWidth = 2;
     ctx.stroke();
 
     //car lane3
     ctx.beginPath();
     ctx.moveTo(0, 400);
     ctx.lineTo(500, 400);
     ctx.strokeStyle = "white";
     ctx.setLineDash([5]);
     ctx.strokeWidth = 2;
     ctx.stroke();

}
function score()
{
    var test1 = true;
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Impact";
    ctx.fillText("Score: " + scoreD, 45, 40);
    ctx.fillText("Level: " + level, 200,40);
    scoring();
    ctx.closePath();
}
function scoring()
{
    if(y<35 && scoringB == false)
    {
        scoreD = (scoreD+1);
        scoringB = true;
        x = 180+canvas.offsetLeft;
        y = 480+canvas.offsetTop;
    }
    scoringB = false;
    if(scoreD == 3)
    {
        level = 2;
        speedcar = [3,-3,4,-3,3,-3];
    }
    if(scoreD == 8)
    {
        level = 3;
        speedcar = [4,-4,5,-4,4,-4];
    }
}
function drawFrog()
{
    ctx.beginPath();
    imgObj.style.top = y+'px';
    imgObj.style.left = x+'px';
}
function moveFrog()
{
    if(rightPressed==true)
    {
        xspeed = 2;
    }
    else if(leftPressed == true)
    {
        xspeed = -2;
    }
    else if(rightPressed==false)
    {
        xspeed = 0;
    }
    else if(leftPressed == false)
    {
        xspeed = 0;
    }
    if(downPressed==true)
    {
        yspeed = 2;
    }
    else if(upPressed == true)
    {
        yspeed = -2;
    }
    else if(upPressed==false)
    {
        yspeed = 0;
    }
    else if(downPressed == false)
    {
        yspeed = 0;
    }
    x+= xspeed;
    y+= yspeed;
}
function keyDownHandler(e)
{
    if(e.keyCode == 39)
    {
        rightPressed = true;
    }
    else if(e.keyCode == 37)
    {
        leftPressed = true;
    }
    else if(e.keyCode == 38)
    {
        upPressed = true;
    }
    else if(e.keyCode == 40)
    {
        downPressed = true;
    }
}
function keyUpHandler(e)
{
    if(e.keyCode == 39)
    {
        rightPressed = false;
    }
    else if(e.keyCode == 37)
    {
        leftPressed = false;
    }
    else if(e.keyCode == 38)
    {
        upPressed = false;
    }
    else if(e.keyCode == 40)
    {
        downPressed = false;
    }
}
function mouseUpHandler(e)
{
    x1 = e.clientX - canvas.offsetLeft;
    y1 = e.clientY - canvas.offsetTop;

    if(x1 > 110 && x1 < 250 && y1 > 80 && y1 < 115)
    {
       questionAnswered=true;
    }
}