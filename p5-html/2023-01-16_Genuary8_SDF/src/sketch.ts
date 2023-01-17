/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics, Shader } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { Particle } from './Particle';

// sketch constants
const NUM_PARTICLES = 20;
///////////////////

// record
const FPS = 60;
const SHOULD_RECORD = false;
const RECORD_FRAMES = 60;
const OUTPUT_FILENAME = 'square';
//////////////////////

// config
const WIDTH = 540;
const HEIGHT = 540;
/////////////////////

// locals
let recorder: Recorder;
let particles: Particle[] = [];
let theShader: Shader;
let pg: Graphics;
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  pixelDensity(1);
  frameRate(60);
  noStroke();
  fill(255);

  for (let i = 0; i < NUM_PARTICLES; i++) {
    const x = random(0.1, 0.4);
    const y = random(0.1, 0.4);
    particles.push(
      new Particle(
        Modulate.createSineLfo(random(2, 10) * FPS, {
          from: width * x,
          to: width * (1 - x),
          phase: int(random(60)),
        }),
        Modulate.createSineLfo(random(2, 10) * FPS, {
          from: height * y,
          to: height * (1 - y),
          phase: int(random(60)),
        })
      )
    );
  }

  pg = createGraphics(width, height);
}

function draw() {
  background(0);
  particles.forEach((p) => p.draw(pg));
  shader(theShader);
  theShader.setUniform('u_texture', pg);
  theShader.setUniform('u_circles', [[0.5, 0.5]]);
  rect(-width / 2, -height / 2, width, height);
  // image(pg, -width / 2, -height / 2, width, height);
  recorder.step();
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
