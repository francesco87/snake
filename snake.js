$(document).ready(function() {
	var canvas = document.getElementById("myCanvas");
	var myCanvas = canvas.getContext("2d");
	var x = 25;
	var y = 25;
	var snake = [[x, y],[--x,y], [--x, y]];
	var food = [];
	var direction = "right";
	var newDirection = "right";

	// createSnake() crea il serpende utilizzando le cordinate X e Y di ogni singolo elemento del serpente salvate nell'array snake
	function createSnake() {
		for(var i=0; i<snake.length; i++) {
			x = snake[i][0];
			y = snake[i][1];
			myCanvas.fillRect(x*10,y*10,10,10);
		};
		getDirection();
	};

	function createFood() {
		myCanvas.beginPath();
        myCanvas.arc((food[0]*10)+10/2, (food[1]*10)+10/2, 10/2, 0, Math.PI*2, false);
        myCanvas.fill();
	};

	// moveSnake() permette al serpente di muoversi e cambiare direzione
	function moveSnake() {
		x = snake[0][0];
		y = snake[0][1];

		if(direction == "right") {
			++x;
			snake.unshift([x, y]); // le nuove cordinate vengono aggiunte all'inizio dell'array snake
			snake.pop(); // elimino l'ultimo elemnto dell'array snake
		};
		if (direction == "left") {
			--x;
			snake.unshift([x,y]);
			snake.pop();
		};
		if (direction == "top") {
			--y;
			snake.unshift([x,y]);
			snake.pop();
		};
		if (direction == "bottom") {
			++y;
			snake.unshift([x,y]);
			snake.pop();
		};

		if( x == food[0] && y == food[1]) {
			score++;
			foodPosition();
		} else {
			//snake.pop(); // Rimuove l'ultimo elemento dell'array snake
		}

		direction = newDirection;
		myCanvas.fillStyle = "#fff";
		snakePiece = myCanvas.fillRect(0,0,500,500);
		myCanvas.fillStyle = "#000";
		createSnake();
		createFood();
	};

	// getDirection() acquisisce la direzione che l'utente vuole dare al serpente catturando il pulsante della tastira
	function getDirection() {
		$(document).keydown(function(event) {
			switch(event.which) {
				case 37:
					if(direction != "right") {
						newDirection = "left";
					};
					break;

				case 38:
					if(direction != "bottom") {
						newDirection = "top";
					};
					break;

				case 39:
					if(direction != "left") {
						newDirection = "right";
					};
					break;

				case 40:
					if(direction != "top") {
						newDirection = "bottom";
					};
					break;
			};
		});
	};

	// food() crea il cibo nella posizione X Y calcolata in modo random dalla funzione
	function foodPosition() {
		var x,y;
		do {
			x = Math.floor(Math.random()*49);
			y = Math.floor(Math.random()*49);
		} while(dead(x,y)) {
			food = [x,y];
		};
	};

	// dead() contralla quando avvengono collisioni con il border dell'aria di gioco e con il serpente stesso
	function dead(x,y) {
		if(x < 0 || x > 499) {
			return true;
		};
		if(y < 0 || y > 499) {
			return true;
		};
		for(var i = 0; i < snake.length; i++) {
			if(snake[i][0] == x && snake[i][1] == y ) {
				return true;
			};
		};
		return false;
	};

	// richiamo la funzione moveSnake ogni mezzo secondo per far muovere il serpente
	setInterval(function(){moveSnake()}, 500);
});