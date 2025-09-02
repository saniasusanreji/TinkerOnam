let stage = 0; 
let flowers = [];

function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(50, 180, 90); 

  translate(width / 2, height / 2);

  
  if (frameCount > 30) stage = 1;
  if (frameCount > 90) stage = 2;
  if (frameCount > 150) stage = 3;
  if (frameCount > 210) stage = 4;
  if (frameCount > 270) stage = 5;
  if (frameCount > 330) stage = 6;

 
  if (stage >= 1) {
    let t = constrain((frameCount - 30) / 60, 0, 1);
    push();
    translate(0, lerp(-400, 0, t));
    scale(lerp(0.2, 1, t));
    drawZigzagRing(280, 340, [color(255, 215, 0), color(255, 69, 0)]);
    pop();
  }

  
  if (stage >= 2) {
    let t = constrain((frameCount - 90) / 60, 0, 1);
    push();
    translate(lerp(-400, 0, t), 0);
    scale(lerp(0.2, 1, t));
    drawPetals(200, 12, [color(139, 0, 0), color(34, 139, 34), color(148, 0, 211)]);
    pop();
  }

 
  if (stage >= 3) {
    let t = constrain((frameCount - 150) / 60, 0, 1);
    push();
    translate(lerp(400, 0, t), 0);
    scale(lerp(0.2, 1, t));
    drawRing(140, [color(75, 0, 130), color(255, 255, 0), color(255, 165, 0)]);
    drawRing(100, [color(255, 0, 0), color(0, 128, 0), color(255, 255, 255)]);
    pop();
  }

  
  if (stage >= 4) {
    let t = constrain((frameCount - 210) / 60, 0, 1);
    push();
    translate(0, lerp(400, 0, t));
    scale(lerp(0.2, 1, t));
    drawSegmentCircle(60, 12, color(255, 140, 0), color(128, 0, 0));
    pop();
  }

  
  if (stage >= 5) {
    let t = constrain((frameCount - 270) / 40, 0, 1);
    let s = lerp(0.2, 1.2, t);
    if (t === 1) s = 1;
    push();
    scale(s);
    fill(255, 223, 0); 
    stroke(128, 0, 128); 
    strokeWeight(3);
    textSize(48);
    textStyle(BOLD);
    text("TinkerOnam", 0, 0);
    pop();
  }

  
  if (stage >= 6) {
    spawnFlowers();
    for (let i = flowers.length - 1; i >= 0; i--) {
      flowers[i].update();
      flowers[i].show();
      if (flowers[i].offscreen()) {
        flowers.splice(i, 1);
      }
    }
  }
}


function drawRing(r, cols) {
  let n = cols.length;
  strokeWeight(30);
  noFill();
  for (let i = 0; i < n; i++) {
    stroke(cols[i]);
    arc(0, 0, r * 2, r * 2, (360 / n) * i, (360 / n) * (i + 1));
  }
}

function drawPetals(r, count, cols) {
  let step = 360 / count;
  for (let i = 0; i < count; i++) {
    let c = cols[i % cols.length];
    fill(c);
    noStroke();
    push();
    rotate(i * step);
    ellipse(r, 0, 100, 160);
    pop();
  }
}


function drawSegmentCircle(r, count, c1, c2) {
  let step = 360 / count;
  for (let i = 0; i < count; i++) {
    fill(i % 2 == 0 ? c1 : c2);
    noStroke();
    arc(0, 0, r * 2, r * 2, i * step, (i + 1) * step, PIE);
  }
}


function drawZigzagRing(innerR, outerR, cols) {
  let points = 36;
  let step = 360 / points;
  beginShape();
  for (let i = 0; i <= points; i++) {
    let angle = i * step;
    let rad = i % 2 == 0 ? outerR : innerR;
    let x = cos(angle) * rad;
    let y = sin(angle) * rad;
    fill(cols[i % cols.length]);
    stroke(0);
    vertex(x, y);
  }
  endShape(CLOSE);
}


class Flower {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.size = random(12, 22);
    this.speed = random(1, 2);
    this.angle = random(0, 360);
  }

  update() {
    this.y += this.speed;
    this.x += sin(frameCount / 10 + this.angle) * 0.5; // wiggle
  }

  show() {
    push();
    noStroke();
    fill(this.col);
    translate(this.x - width / 2, this.y - height / 2); // back to canvas coords
    for (let i = 0; i < 6; i++) {
      ellipse(0, 0 - this.size / 2, this.size / 2, this.size);
      rotate(60);
    }
    fill(255, 200, 0); // yellow center
    ellipse(0, 0, this.size / 2);
    pop();
  }

  offscreen() {
    return this.y > height + 20;
  }
}

function spawnFlowers() {
  if (frameCount % 10 === 0) {
    let x = random(0, width);
    let col = random([color(255, 105, 180), color(255, 255, 0)]); // pink & yellow
    flowers.push(new Flower(x, -20, col));
  }
}
