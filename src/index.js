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
let color = createRandomColor();

const drawBall = () => {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = `#${color}`;
	ctx.fill();
	ctx.closePath();
};

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();

	if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
		color = createRandomColor();
		dy = -dy;
	}

	if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
		color = createRandomColor();
		dx = -dx;
	}

	x += dx;
	y += dy;
};

setInterval(draw, 10);
