/*jshint esversion: 6 */
const canvas = document.querySelector('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
c = canvas.getContext('2d');
const angle = Math.PI * 2.0;

function randColor() {
  let colorsList = ['#FF80E5', '#8093F1', '#F56416', '#FFFC31'];
  let color = colorsList[Math.floor(Math.random() * colorsList.length)];
  return color;

  // for (var i = 0, col = ''; i < 6; i++) {
  //   col += (Math.random() * 16 | 0).toString(16);
  // }
  //
  // return '#' + col;
}

const mouse = {
  x: undefined,
  y: undefined,
  prevX: undefined,
  prevY: undefined,
};

window.addEventListener('click',
function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function Bubble(x, y, r, dx, dy, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, angle);
    c.fillStyle = color;
    c.fill();
  };

  var mouseDistance = Math.sqrt(Math.pow(this.y - mouse.y, 2) + Math.pow(this.y - mouse.y, 2));
  this.update = function () {
    if (this.x + this.r > canvas.width || this.x - this.r < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.r > canvas.height || this.y - this.r < 0) {
      this.dy = -this.dy;
    }

    // interactivity
    if (mouse.x && this.dx > 0.5) {
      this.dy = -(this.y - mouse.y) / 10.0;
      this.dx = -(this.x - mouse.x) / 10.0;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

var bubbles = [];
for (var i = 0; i < 300; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.width;
  let dx = (Math.random() - 0.5) * 4;
  let dy = (Math.random() - 0.5) * 4;
  let r = Math.random() * 10;
  color = randColor();
  bubbles.push(new Bubble(x, y, r, dx, dy, color));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
  }

}

animate(bubbles);
