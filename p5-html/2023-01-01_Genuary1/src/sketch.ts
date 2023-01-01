/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Modulate } from '../../utils/p5.modulate';
import { Particle } from './particle';
import { PALETTE, randomPalette } from '../../utils/colors.ts';

const START_DISTANCE = 20;
const DISTANCE_BETWEEN_PARTICLES = 30;
const NUM_PARTICLES_START = 6;
const NUM_PARTICLES_INCREASE = 10;
const START_SWAY = 5;

const FPS = 60;
const WIDTH = 540;
const HEIGHT = 540;
const particles: Particle[] = [];
function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(FPS);
  stroke(255);
  fill(0);
  strokeWeight(1);
  let distance = START_DISTANCE;
  let numParticles = NUM_PARTICLES_START;
  let sway = START_SWAY;
  let phase = 0;
  let j = 0;
  while (distance < width) {
    let a = PI / 2;
    const lfo = Modulate.createSineLfo(FPS * 8, { phase });
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(a, distance, lfo, sway, PALETTE[j % PALETTE.length]));
      a += TWO_PI / numParticles;
    }
    distance += DISTANCE_BETWEEN_PARTICLES;
    numParticles += NUM_PARTICLES_INCREASE;
    sway *= 1.2;
    phase += 10;
    j++;
  }
}

function draw() {
  background(0);
  particles.forEach((p) => p.draw());
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  randomPalette();
}

//#region add globals
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
