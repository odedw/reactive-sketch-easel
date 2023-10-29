/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics, Shader } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';

// sketch constants
// const CONSTANT = 10;
///////////////////

// record
const FPS = 60;
const SHOULD_RECORD = false;
const RECORD_FRAMES = 60;
const OUTPUT_FILENAME = 'square';
//////////////////////

// config
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
/////////////////////

// locals
// let recorder: Recorder;
let theShader: Shader;
let prevFrame: Graphics;
////////////////////

function preload() {
  // recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  background(0);
  pixelDensity(1);
  frameRate(60);
  stroke(255);
  shader(theShader);
  theShader.setUniform('u_resolution', [1.0 / width, 1.0 / height]);

  // @ts-ignore
  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();
}

function draw() {
  // background(0);

  if (mouseIsPressed) {
    line(pmouseX - width / 2, pmouseY - height / 2, mouseX - width / 2, mouseY - height / 2);
  }

  // Copy the rendered image into our prevFrame image
  // @ts-ignore
  prevFrame.image(get(), 0, 0);
  // Set the image of the previous frame into our shader
  theShader.setUniform('u_texture', prevFrame);

  rect(-width / 2, -height / 2, width, height);

  // recorder.step();
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
}

//#region add globals
// @ts-ignore
window.preload = preload;
// @ts-ignore
window.setup = setup;
// @ts-ignore
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
