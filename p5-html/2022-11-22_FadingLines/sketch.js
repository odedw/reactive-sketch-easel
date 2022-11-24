/// <reference path="../../node_modules/@types/p5/global.d.ts" />

///////////////////////////////////////////
let NUM_PARTICLES, MAX_DISTANCE, STROKE_WEIGHT, MAX_SPEED;
// print(`NUM_PARTICLES: ${NUM_PARTICLES}`);
// print(`MAX_DISTANCE: ${NUM_PARTICLES}`);
// print(`STROKE_WEIGHT: ${NUM_PARTICLES}`);
// print(`MAX_SPEED: ${NUM_PARTICLES}`);
///////////////////////////////////////////
const WIDTH = 540;
const HEIGHT = 540;
const SHOULD_RECORD = false;
const RECORD_TIME = 1;
const FPS = 60;
let opacity = 10;

class Particle {
  constructor() {
    this.pos = { x: random(width), y: random(height) };
    this.vel = { x: random(0, MAX_SPEED), y: random(0, MAX_SPEED) };
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  draw() {
    // fill(0, 255, 0);
    // circle(this.pos.x, this.pos.y, 8);
  }
}

let particles = [];
function preload() {
  preloadRecorder();
}

function setup() {
  createCanvas(540, 540);
  NUM_PARTICLES = floor(random(30, 70));
  MAX_DISTANCE = floor(random(50, 200));
  STROKE_WEIGHT = floor(random(3, 8));
  MAX_SPEED = floor(random(1.2, 1.8));
  print(`NUM_PARTICLES: ${NUM_PARTICLES}`);
  print(`MAX_DISTANCE: ${NUM_PARTICLES}`);
  print(`STROKE_WEIGHT: ${NUM_PARTICLES}`);
  print(`MAX_SPEED: ${NUM_PARTICLES}`);
  ///////////////////////////////////////////
  frameRate(FPS);
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }

  strokeWeight(STROKE_WEIGHT);
}

function draw() {
  // const alpha = map(sin(frameCount / 20), -1, 1, 20, 100);
  // console.log(alpha);
  background(0, 0, 0, opacity);
  for (let p of particles) {
    p.update();
    p.draw();
  }

  for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      stroke(0, 255, 0);
      let p1 = particles[i];
      let p2 = particles[j];
      const d = dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
      if (d < MAX_DISTANCE) {
        const c = lerpColor(color('#00d8ff'), color('#008cff'), d / MAX_DISTANCE);
        stroke(c);
        line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
      }
    }
  }

  recorderStep();
}

function mouseClicked(event) {
  console.log('frameCount', frameCount);
}

function mouseWheel(event) {
  //move the square according to the vertical scroll amount
  opacity += Math.sign(event.delta) * -1;
  print(opacity);

  //uncomment to block page scrolling
  //return false;
}
