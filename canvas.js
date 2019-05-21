/*jshint esversion: 6 */
const canvas = document.querySelector('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
c = canvas.getContext('2d');
const angle = Math.PI * 2.0;
const bubbleCount = 100;
const maxR = 10; // Maximum radius

function randColor() {
  let colorsList = ['#FF80E5', '#8093F1', '#F56416', '#FFFC31', '#B388EB', '#B4EDD2'];
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
  clicked: false,
};

window.addEventListener('click',
function (event) {
  // Make sure bubbles are completly within
  // the canvas
  if (event.x > canvas.width - maxR) {
    mouse.x = canvas.width - maxR;
  } else if (event.x < maxR) {
    mouse.x = maxR;
  } else {
    mouse.x = event.x;
  }

  if (event.y > canvas.height - maxR) {
    mouse.y = canvas.height - maxR;
  } else if (event.y < maxR) {
    mouse.y = maxR;
  } else {
    mouse.y = event.y;
  }

  mouse.clicked = true;
});

function Bubble(x, y, r, dx, dy, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.toMause = false;
  this.initial = true;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, angle);
    c.fillStyle = color;
    c.fill();
  };

  this.update = function () {
    var mouseDistance = Math.sqrt(Math.pow(this.y - mouse.y, 2) + Math.pow(this.x - mouse.x, 2));
    if (this.x + this.r > canvas.width || this.x - this.r < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.r > canvas.height || this.y - this.r < 0) {
      this.dy = -this.dy;
    }

    // push inside if far
    if (this.x + this.r > canvas.width + 10 || this.x - this.r < -10) {
      this.x = Math.random() * canvas.width;
    }

    if (this.y + this.r > canvas.height + 10 || this.y - this.r < -10) {
      this.y = Math.random() * canvas.height;
    }

    // interactivity
    if (mouse.clicked) {
      this.toMause = true;
      this.dy = -(this.y - mouse.y) / 30.0;
      this.dx = -(this.x - mouse.x) / 30.0;
      if (this.initial) {
        this.initial = false;
        this.initialdx = Math.sign(this.dx) * Math.log(Math.abs(this.dx));
        this.initialdy = Math.sign(this.dy) * Math.log(Math.abs(this.dy));
      }
    } else if ((mouseDistance <= maxR) && (this.toMause)) {
      this.toMause = false;
      this.initial = true;
      this.dx = this.initialdx; // (Math.random() < 0.5 ? -1 : 1) * (Math.random() + 0.2) * 1.5;
      this.dy = this.initialdy; // (Math.random() < 0.5 ? -1 : 1) * (Math.random() + 0.2) * 1.5;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

var bubbles = [];
for (var i = 0; i < bubbleCount; i++) {
  let r = Math.random() * maxR;

  // Do not create bubbles on the edge
  // of the canvas
  let x = Math.random() * canvas.width - r;
  x = x < r ? r : x;
  let y = Math.random() * canvas.height - r;
  y = y < r ? r : y;
  let dx = (Math.random() < 0.5 ? -1 : 1) * (Math.random() + 0.2) * 1.5;
  let dy = (Math.random() < 0.5 ? -1 : 1) * (Math.random() + 0.2) * 1.5;
  color = randColor();
  bubbles.push(new Bubble(x, y, r, dx, dy, color));
}

function animate() {
  requestAnimationFrame(animate);
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  c.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(function (obj) {
    obj.update();
  });

  mouse.clicked = false;
}

animate();
