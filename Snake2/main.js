var canvas = document.getElementById("canv"); 
var c = canvas.getContext("2d");
var startImg = new Image();

function load() 
{
	startImg.src = "start.png";
};

load();

function update() 
{

};

update();

function draw()
{
	c.font = "70px Arial";
	c.fillStyle = "white";
	c.fillText("Loading...", 90, 260);
};

draw();