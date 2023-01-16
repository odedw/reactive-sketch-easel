/// <reference path="../node_modules/@types/p5/global.d.ts" />
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
const WIDTH = 540;
const HEIGHT = 540;
/////////////////////

// locals
let recorder: Recorder;
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  pixelDensity(1);
  frameRate(60);
  noStroke();
  fill(255);
}

function draw() {
  background(0);

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
