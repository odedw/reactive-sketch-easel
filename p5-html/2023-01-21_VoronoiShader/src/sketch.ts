/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics, Image, Shader } from 'p5';
import { resolveProjectReferencePath } from 'typescript';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { Particle } from './Particle';

// sketch constants
const NUM_PARTICLES = 20000;
const IMAGE_NAME = 'kschoice.jpg';
///////////////////

// record
const FPS = 30;
const SHOULD_RECORD = true;
const RECORD_FRAMES = FPS * 30;
const OUTPUT_FILENAME = '07';
//////////////////////

// config
const WIDTH = 540;
const HEIGHT = 540;
/////////////////////

// locals
let recorder: Recorder;
let theShader: Shader;
let particles: Particle[] = [];
let img: Image;
let pg: Graphics;
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  // theShader = loadShader('shader.vert', 'shader.frag');
  img47T;loadJSONEARPOGH
  resolveProjectReferencePathHLJNB
  ;TLFGNMH;'KLDHVPPFGOOFGHJ]' = loadImage(IMAGE_NAME);
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  pg = createGraphics(WIDTH, HEIGHT);
  pg.image(img, 0, 0, pg.width, pg.height);
  pixelDensity(1);
  frameRate(60);
  noStroke();
  fill(255);
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const p = new Particle(random(0, width), random(0, height));
    particles.push(p);
    // console.log(width / 2 + p.x, height / 2 + p.y);
  }
  // for (let x = 0; x < width; x += width / Math.sqrt(NUM_PARTICLES)) {
  //   for (let y = 0; y < width; y += height / Math.sqrt(NUM_PARTICLES)) {
  //     particles.push(new Particle(x - width / 2, y - height / 2));
  //   }
  // }
}

function draw() {
  background(0);
  // image(pg, -width / 2, -height / 2, width, height);
  particles.forEach((p) => p.step());

  // shader(theShader);
  // theShader.setUniform(
  //   'u_coordsX',
  //   particles.map((p) => p.x / width)
  // );
  // theShader.setUniform(
  //   'u_coordsY',
  //   particles.map((p) => p.y / height)
  // );
  // theShader.setUniform('u_texture', img);
  // rect(-width / 2, -height / 2, width, height);

  // translate(-width / 2, -height / 2);
  particles.forEach((p) => p.draw(pg));
  recorder.step();
}

function mouseClicked(event?: object) {
  // console.log('frameCount', frameCount);
  console.log(mouseX, mouseY);
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
