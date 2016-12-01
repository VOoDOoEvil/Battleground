
var canvas;
var canvasContext;
var framesPerSecond = 30;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 4;
var leftPaddleY = 100;
var rightPaddleY = 100;
var playerScore = 0;
var AIScore = 0;
var showWinScreen = false;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const WINNING_SCORE = 2;

window.onload = function() {
	canvas = document.getElementById("gameField");
	canvasContext = canvas.getContext('2d');
	
	setInterval(callMoveAndDraw, 1000 / framesPerSecond);

	canvas.addEventListener('mousedown', handleMouseClick);

	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePosition(evt);
		leftPaddleY = mousePos.y - (PADDLE_HEIGHT/2);
	});
}

function handleMouseClick(evt) {
	if(showWinScreen) {
		playerScore = 0;
		AIScore = 0;
		showWinScreen = false;
	}
}

function drawContent() {
	// draw game field
	canvasContext.fillStyle = '#1A1918';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	if (showWinScreen) {
		canvasContext.fillStyle = 'red';

		if (playerScore >= WINNING_SCORE) {
			canvasContext.fillText("PLAYER WON!!", 350, 200);
		} 

		if (AIScore >= WINNING_SCORE) {
			canvasContext.fillText("AI WON!!!!", 350, 200);
		}

		canvasContext.fillText("click to continue", 350, 500);
		return;
	}

	// draw LEFT paddle
	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(0, leftPaddleY, PADDLE_THICKNESS, PADDLE_HEIGHT);

	// draw RIGHT paddle
	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(canvas.width - PADDLE_THICKNESS, rightPaddleY, PADDLE_THICKNESS, PADDLE_HEIGHT);

	// draw ball
	canvasContext.fillStyle = 'white';
	canvasContext.beginPath();
	canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
	canvasContext.fill();

	// draw score
	canvasContext.fillText("score: " + playerScore, 100, 100);
	canvasContext.fillText("score: " + AIScore, canvas.width - 150, 100);

	// draw net
	for(var i = 0; i < canvas.height; i += 40) {
		canvasContext.fillRect(canvas.width / 2 - 1, i, 2, 20, 'white');
	}
}

function moveContent() {
	if (showWinScreen) {
		return;
	}

	AI();
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballX > canvas.width) {
		if (ballY > rightPaddleY && ballY < rightPaddleY + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (rightPaddleY + PADDLE_HEIGHT/ 2);
			ballSpeedY = deltaY * 0.35;
		} else {
			playerScore++;
			resetBall();
		}	
	}

	if (ballX < 0) {
		if (ballY > leftPaddleY && ballY < leftPaddleY + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (leftPaddleY + PADDLE_HEIGHT/ 2);
			ballSpeedY = deltaY * 0.35;
		} else {
			AIScore++;
			resetBall();
		}
	}
	
	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}

	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
}

function callMoveAndDraw() {
	moveContent();
	drawContent();
}

function getMousePosition(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function resetBall() {
	if (playerScore >= WINNING_SCORE || AIScore >= WINNING_SCORE) {
		showWinScreen = true;
	}

	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function AI() {
	var rightPaddleCenter = rightPaddleY + (PADDLE_HEIGHT/2);
	if (rightPaddleCenter < ballY - 35) {
		rightPaddleY += 6;
	} else if (rightPaddleCenter > ballY + 35){ 
		rightPaddleY -= 6;
	}
}











