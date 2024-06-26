const canvas = document.querySelector("#ballCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const balls = [];

class Ball {
  constructor(x, y) {
    this.x = x;
    this.xVel = (Math.random() - 0.5) * 10;
    this.y = y;
    this.yVel = (Math.random() - 0.5) * 10;
    this.size = Math.floor(Math.random() * 30) + 10;
    this.color = Ball.getRandomColor();
  }
  // Static function for genrating random RGB values
  static getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }
  // To create animation effect on the balls by updating their positions
  update() {
    // The if conditionals help keep the balls in the bounds of the Canvas, bouncing them off the edges
    if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
      this.xVel = -this.xVel;
    }
    if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
      this.yVel = -this.yVel;
    }
    // Adding this.xVel/yVel helps in movement of the balls for animation and direction
    this.x += this.xVel;
    this.y += this.yVel;

    // We can also add gravitational effects if we just change the yVel relative to the distance from the bottom edge of the canvas
    /* if (this.y + this.size < canvas.height) {
      this.yVel += 0.25;
    } */
  }
  // Function to draw the balls with the relative values specified or updated.
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function ballsAnimation() {
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let ball of balls) {
    ball.update();
    ball.draw();
  }
  requestAnimationFrame(ballsAnimation);
}
ballsAnimation();

canvas.addEventListener("click", (e) => {
  const ball = new Ball(e.clientX, e.clientY);
  balls.push(ball);
});
