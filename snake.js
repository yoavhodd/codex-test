let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(600, 600);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(10);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  const x = floor(random(w));
  const y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      snake.setDir(-1, 0);
      break;
    case RIGHT_ARROW:
      snake.setDir(1, 0);
      break;
    case DOWN_ARROW:
      snake.setDir(0, 1);
      break;
    case UP_ARROW:
      snake.setDir(0, -1);
      break;
  }
}

function draw() {
  scale(rez);
  background(220);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.xdir = 0;
    this.ydir = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    const head = this.body[this.body.length - 1].copy();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.shift();
    this.body.push(head);
  }

  grow() {
    const head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }

  endGame() {
    const head = this.body[this.body.length - 1];
    if (head.x > w - 1 || head.x < 0 || head.y > h - 1 || head.y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      const part = this.body[i];
      if (part.x === head.x && part.y === head.y) {
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    const head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
}
