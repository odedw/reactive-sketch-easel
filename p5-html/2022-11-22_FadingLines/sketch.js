/// <reference path="../../node_modules/@types/p5/global.d.ts" />

///////////////////////////////////////////
let MAX_SPEED;
///////////////////////////////////////////
const WIDTH = 540;
const HEIGHT = 540;
const SHOULD_RECORD = false;
const RECORD_TIME = 1;
const FPS = 60;
const DEBUG = true;
const COLORS = ['#00d8ff', '#008cff'];
let attenuators = { numParticles: 30, strokeWeight: 6, maxDistance: 100, fadeInDistance: 0 };
bindParameterToMidi(attenuators, 'opacity', 0, 10, 77);
bindParameterToMidi(attenuators, 'strokeWeight', 3, 20, 78);
bindParameterToMidi(attenuators, 'numParticles', 30, 200, 79, { floor: true });
bindParameterToMidi(attenuators, 'maxDistance', 50, 200, 80, { floor: true });
spikeParameterOnNoteOn(attenuators, 'numParticles', 100, 20, 'F2');
spikeParameterOnNoteOn(attenuators, 'maxDistance', 100, 20, 'F2');

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

  // draw() {
  //   // fill(0, 255, 0);
  //   // circle(this.pos.x, this.pos.y, 8);
  // }
}

function addParticles(num) {
  if (num < 0) {
    removeParticle(abs(num));
  }
  for (let i = 0; i < num; i++) {
    particles.push(new Particle());
  }
}

function removeParticle(num) {
  console.log('removeParticle', num);
  for (let i = 0; i < num; i++) {
    const index = floor(random(particles.length));
    particles.splice(index, 1);
    if (particles.length == 0) break;
  }
}

let particles = [];
function preload() {
  preloadRecorder();
}

function setup() {
  createCanvas(540, 540);
  MAX_SPEED = floor(random(1.2, 1.8));
  ///////////////////////////////////////////
  frameRate(FPS);
}

function draw() {
  if (particles.length != attenuators.numParticles) {
    addParticles(attenuators.numParticles - particles.length);
  }
  strokeWeight(attenuators.strokeWeight);

  // const alpha = map(sin(frameCount / 20), -1, 1, 20, 100);
  // console.log(alpha);
  background(0, 0, 0, attenuators.opacity);
  for (let p of particles) {
    p.update();
    // p.draw();
  }

  for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      stroke(0, 255, 0);
      let p1 = particles[i];
      let p2 = particles[j];
      const d = dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
      if (d < attenuators.maxDistance) {
        const c = lerpColor(color(COLORS[0]), color(COLORS[1]), d / attenuators.maxDistance);
        stroke(c);
        line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
      } else if (d < attenuators.maxDistance + attenuators.fadeInDistance) {
        const c = color(
          red(COLORS[0]),
          green(COLORS[0], blue(COLORS[0]), (255 * (d - attenuators.maxDistance)) / attenuators.fadeInDistance)
        );
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
