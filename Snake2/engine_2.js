var JS_SNAKE_GAME = {}

JS_SNAKE_GAME.game = (function()
{
	var snake, point, apple, timeout;

	function init()
	{
		var canvas = document.getElementById("canv"),
		canv = canvas.getContext("2d"),
		play = true,
		X = [1, 61, 121, 181, 241, 301, 361, 421],
		Y = [1, 61, 121, 181, 241, 301, 361, 421],
		a, b, counter = 0,
		f = 4;

		snake = JS_SNAKE_GAME.snake();
		apple = JS_SNAKE_GAME.apple();
	};
})();

function rndmInt(min, max)
{
	var rand = min - 0.5 + Math.random() * (max - min + 1);
		rand = Math.round(rand);
	return rand;
}

function init() {
	if (play == true)
	{
		update();
		draw();
	}
}

(function load()
{
	function GameObject(name, x, y, image)
	{
		this.name = name;
		this.image = image;
		this.x = x;
		this.y = y;
	}

	point = [];
	for(var q = 0; q <= f; q++)
	{
		point.push({a: 0, b: q});
	}

	var appleImg = new Image();
	appleImg.src = "https://raw.githubusercontent.com/McGucket/OtherSnake/master/Snake2/apple.png";
	apple = new GameObject(apple, X[rndmInt(0.0, 7.0)], Y[rndmInt(0.0, 7.0)], appleImg);
	
	snake = [];
	for(var i = 0; i <= f; i++)
	{
		snake.push({x: X[point[i].a], y: Y[point[i].b]});
	}

	return point;
	return apple;
	return snake;
})();

function update()
{

	function checkCollision(r, t) 
	{
		if (r.x == t.x && r.y == t.y)
		{
			return true;
		}
	}

	function inheritPos()
	{
		for (var m = f; m >= 1; m--)
		{
			point[m].a = point[m - 1].a;
			point[m].b = point[m - 1].b;
		}
	}

	function changePos()
	{
		for (var l = 1; l <= f; l++)
		{
			snake[l].x = X[point[l].a];
			snake[l].y = Y[point[l].b];
		}
	}

	function createFood()
	{
		apple.x = X[rndmInt(0.0, 7.0)];
		apple.y = Y[rndmInt(0.0, 7.0)];
		for (i = 0; i < snake.length; i++)
		{
			if (checkCollision(snake[i], apple) == true)
			{
				createFood();
			}
		}
	}

	createFood();

	function grow() {
		f++;
		point.push({a: point[f - 1].a, b: point[f - 1].b});
		snake.push({x: X[point[f].a], y: Y[point[f].b]});
	}

	function returnOnField()
	{
			 if (point[0].a < 0) { point[0].a = 7; }
		else if (point[0].a > 7) { point[0].a = 0; }

			 if (point[0].b < 0) { point[0].b = 7; }
		else if (point[0].b > 7) { point[0].b = 0; }
	}

	function gameover()
	{
		for (var d = 1; d < snake.length; d++)
		{
			if (checkCollision(snake[0], snake[d]) == true)
			{
				var score = counter * 10;
				canv.clearRect(0, 0, 482, 482);
				canv.fillStyle = "white";
				canv.font = 70 + "px Arial";
				canv.fillText("Game Over", 60, 250);
				canv.font = 50 + "px Arial";
				canv.fillText("Your score: " + score, 80, 320);
				play = false;
			}
		}
	}

	function move(direction)
	{
		if (checkCollision(snake[0], apple) == true)
		{
			createFood();
			grow();
			counter++;
		}
		inheritPos();
		switch(direction)
		{
			case "Up":
				point[0].b--;
				returnOnField();
				snake[0].y = Y[point[0].b];
			break;
			case "Down":
				point[0].b++;
				returnOnField();
				snake[0].y = Y[point[0].b];
			break;
			case "Left":
				point[0].a--;
				returnOnField();
				snake[0].x = X[point[0].a];
			break;
			case "Right":
				point[0].a++;
				returnOnField();
				snake[0].x = X[point[0].a];
			break;
		}
		changePos();
		draw();
		gameover();
	}

	addEventListener("keydown", function(event)
	{
		if (play == true)
		{
				 if(event.keyCode == 38) { move("Up"); }
			else if(event.keyCode == 40) { move("Down"); }
			else if(event.keyCode == 37) { move("Left"); }
			else if(event.keyCode == 39) { move("Right"); }
		}
	});
}

function draw()
{
	canv.drawImage(apple.image, apple.x, apple.y, 60, 60);

	canv.fillStyle = "white";
	for(var j = 0; j < f; j++)
	{
		canv.fillRect(snake[j].x, snake[j].y, 60, 60);
	}
	canv.clearRect(snake[f].x, snake[f].y, 60, 60);
}

init();