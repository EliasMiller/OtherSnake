var canvas = document.getElementById("canv"); 
var c = canvas.getContext("2d");
var X = [1, 61, 121, 181, 241, 301, 361, 421];
var Y = [1, 61, 121, 181, 241, 301, 361, 421];
var snake;
var apple;
var a = 0;
var b = 0;
var f = 6;

function rdmInt(min, max)
{
	var rand = min - 0.5 + Math.random() * (max - min + 1);
	rand = Math.round(rand);
	return rand;
};

function init()
{
	load();
	update();
	draw();
};

function load()
{
	var appleImg = new Image();
	appleImg.src = "https://raw.githubusercontent.com/McGucket/snake2/master/Snake2/apple.png";
	apple = [];
	apple.push({x: X[rdmInt(0.0, 7.0)], y: Y[rdmInt(0.0, 7.0)], image: appleImg});
	snake = [];
	for(var i = 0; i < f; i++)
	{
		snake.push({x: X[0], y: Y[i], color: "white"})
	};
};

function update()
{

	function checkColl(r, t) 
	{
		if (r.x == t.x && r.y == t.y)
		{
			t.x = X[rdmInt(0.0, 7.0)];
			t.y = Y[rdmInt(0.0, 7.0)];
			if (t.x > 421)
			{
				t.x = X[7];
			};
			if (t.x < 1)
			{
				t.x = X[0];
			};
			if (t.y > 421)
			{
				t.y = Y[7];
			};
			if (t.y < 1)
			{
				t.y = Y[0];
			};
			//f++;
		};
	};

	function inheritPos() 
	{
		for (m = f; m > 2; m--) 
		{
			point[m].a = point[m - 1].a;
			point[m].b = point[m - 1].b;
		}
	};

	function changePos()
	{
		for (d = 2; d < f; d++)
		{
			snake[d].x = X[point[d].a];
			snake[d].y = Y[point[d].b];
		}
	};

	addEventListener("keydown", function(event)
	{
		if(event.keyCode == 38) //up 
		{
			b--;
			if (b < 0)
			{
				c.clearRect(X[a],  Y[0], 59, 59);
				b = 7;
			};
			snake[0].y = Y[b];
			c.clearRect(X[a], Y[b + 1], 59, 59);
			checkColl(snake[0], apple[0]);
			draw();
		}
	});
	addEventListener("keydown", function(event)
	{
		if(event.keyCode == 40) //down
		{
			b++;
			if (b > 7)
			{
				c.clearRect(X[a],  Y[7], 59, 59);
				b = 0;
			};
			snake[0].y = Y[b];
			c.clearRect(X[a], Y[b - 4], 59, 59);
			checkColl(snake[0], apple[0]);
			draw();
		}
	});
	addEventListener("keydown", function(event)
	{
		if(event.keyCode == 37) //left
		{
			a--;
			if (a < 0)
			{
				c.clearRect(X[0],  Y[b], 59, 59);
				a = 7;
			};
			snake[0].x = X[a];
			c.clearRect(X[a + 1], Y[b], 59, 59);
			checkColl(snake[0], apple[0]);
			draw();
		}
	});
	addEventListener("keydown", function(event)
	{
		if(event.keyCode == 39) //right
		{
			a++;
			if (a > 7)
			{
				c.clearRect(X[7],  Y[b], 59, 59);
				a = 0;
			};
			snake[0].x = X[a];
			c.clearRect(X[a - 1],  Y[b], 59, 59);
			checkColl(snake[0], apple[0]);
			draw();
		}
	});
};

function draw()
{
	c.drawImage(apple[0].image, apple[0].x, apple[0].y, 59, 59);
	c.fillStyle = snake[0].color;
	for(var j = 0; j < f; j++)
	{
		c.fillRect(snake[j].x, snake[j].y, 59, 59);
	};
};

init();
