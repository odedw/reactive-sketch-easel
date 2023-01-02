/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Modulate } from '../../utils/p5.modulate';
import { Particle } from './particle';
import { PALETTE, randomPalette } from '../../utils/colors.ts';
import { preloadRecorder, recorderStep } from '../../utils/recorder.ts';

const START_DISTANCE = 20;
const DISTANCE_BETWEEN_PARTICLES = 30;
const NUM_PARTICLES_START = 6;
const NUM_PARTICLES_INCREASE = 10;
const START_SWAY = 5;

const SHOULD_RECORD = false;
const RECORD_TIME = 8;
const FPS = 60;
const WIDTH = 540;
const HEIGHT = 540;
const particles: Particle[] = [];

function preload() {
  if (SHOULD_RECORD) preloadRecorder(RECORD_TIME, FPS);
}

function setup() {
  window.drawingContext = drawingContext;
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
      particles.push(new Particle(a, distance, lfo, sway, 'black')); //PALETTE[j % PALETTE.length]));
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
  if (SHOULD_RECORD) recorderStep();
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  randomPalette();
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
