let projectile;
let slingAnchor;
let isDragging = false;
let block;
let gravity;

function setup() {
  createCanvas(800, 400);
  slingAnchor = createVector(150, height - 100);
  resetProjectile();
  block = new Block(500, height - 75, 50, 50);
  gravity = createVector(0, 0.5);
}

function draw() {
  background(200);

  // Draw slingshot base
  stroke(100);
  strokeWeight(4);
  line(slingAnchor.x - 20, slingAnchor.y + 20, slingAnchor.x, slingAnchor.y);
  line(slingAnchor.x + 20, slingAnchor.y + 20, slingAnchor.x, slingAnchor.y);

  // Draw elastic if dragging
  if (isDragging) {
    stroke(50);
    line(slingAnchor.x, slingAnchor.y, projectile.pos.x, projectile.pos.y);
  }

  projectile.update();
  projectile.show();

  block.update();
  block.show();
}

function mousePressed() {
  if (projectile.contains(mouseX, mouseY)) {
    isDragging = true;
  }
}

function mouseDragged() {
  if (isDragging) {
    projectile.pos.x = mouseX;
    projectile.pos.y = mouseY;
    projectile.vel.set(0, 0);
  }
}

function mouseReleased() {
  if (isDragging) {
    const force = p5.Vector.sub(slingAnchor, projectile.pos).mult(0.15);
    projectile.vel = force;
    isDragging = false;
  }
}

function resetProjectile() {
  projectile = new Projectile(slingAnchor.x, slingAnchor.y, 20);
}

class Projectile {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.r = r;
  }

  update() {
    if (!isDragging) {
      this.vel.add(gravity);
      this.pos.add(this.vel);
    }

    // Ground collision
    if (this.pos.y + this.r > height) {
      this.pos.y = height - this.r;
      this.vel.y *= -0.5;
      this.vel.x *= 0.9;
      if (abs(this.vel.y) < 0.1) this.vel.y = 0;
    }

    // Check collision with block
    if (block.intersectsCircle(this.pos.x, this.pos.y, this.r)) {
      block.hit(this.vel.copy());
    }
  }

  contains(x, y) {
    return dist(x, y, this.pos.x, this.pos.y) < this.r;
  }

  show() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

class Block {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.vel = createVector(0, 0);
    this.isMoving = false;
  }

  update() {
    if (this.isMoving) {
      this.vel.add(gravity);
      this.pos.add(this.vel);
      if (this.pos.y + this.h / 2 > height) {
        this.pos.y = height - this.h / 2;
        this.vel.mult(0);
        this.isMoving = false;
      }
    }
  }

  hit(impulse) {
    this.vel = impulse.copy().mult(0.5);
    this.isMoving = true;
  }

  intersectsCircle(cx, cy, r) {
    const closestX = constrain(cx, this.pos.x - this.w / 2, this.pos.x + this.w / 2);
    const closestY = constrain(cy, this.pos.y - this.h / 2, this.pos.y + this.h / 2);
    const d = dist(cx, cy, closestX, closestY);
    return d < r && !this.isMoving;
  }

  show() {
    push();
    rectMode(CENTER);
    fill(100, 200, 100);
    rect(this.pos.x, this.pos.y, this.w, this.h);
    pop();
  }
}
