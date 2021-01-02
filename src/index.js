const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
let dx = 2;
let dy = -2;
let x = canvas.width / 2;
let y = canvas.height - 30;
const createRandomColor = () => {
	let randomColor = Math.floor(Math.random() * 16777215).toString(16);
	return randomColor;
};
let ballColor = createRandomColor();
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

const drawBall = () => {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = `#${ballColor}`;
	ctx.fill();
	ctx.closePath();
};

const drawPaddle = () => {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
};

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();

	// Switch directions if ball hits edge of canvas
	if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
		ballColor = createRandomColor();
		dy = -dy;
	}

	if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
		ballColor = createRandomColor();
		dx = -dx;
	}

	x += dx;
	y += dy;

	// Move paddle depending on which arrow is pressed
	if (rightPressed) {
		paddleX += 7;
		if (paddleX + paddleWidth > canvas.width) {
			paddleX = canvas.width - paddleWidth;
		}
	}
	if (leftPressed) {
		paddleX -= 7;
		if (paddleX < 0) {
			paddleX = 0;
		}
	}
};

const keydownHandler = (e) => {
	if (e.key === "Right" || e.key === "ArrowRight") {
		rightPressed = true;
	} else if (e.key === "Left" || e.key === "ArrowLeft") {
		leftPressed = true;
	}
};

const keyupHandler = (e) => {
	if (e.key === "Right" || e.key === "ArrowRight") {
		rightPressed = false;
	} else if (e.key === "Left" || e.key === "ArrowLeft") {
		leftPressed = false;
	}
};

document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);
setInterval(draw, 10);
