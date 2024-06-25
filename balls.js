const canvas = document.querySelector("#ballCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.floor(Math.random() * 30) + 10;
    this.color = Ball.getRandomColor();
  }

  static getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

canvas.addEventListener("click", (e) => {
  const ball = new Ball(e.clientX, e.clientY);
  ball.draw();
});
