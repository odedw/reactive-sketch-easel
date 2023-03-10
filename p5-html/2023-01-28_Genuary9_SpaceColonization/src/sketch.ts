/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Shader, Vector } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { AttractionPoint } from './AttractionPoint';
import { Branch } from './Branch';
import { makeNoise2D } from 'open-simplex-noise';
import { Vine } from './Vine';

// sketch constants
const MIN_DISTANCE = 10;
const MAX_DISTANCE = 30;
const NUM_START_BRANCHES = 2;
///////////////////

// record
const FPS = 30;
const SHOULD_RECORD = false;
const RECORD_FRAMES = FPS * 30;
const OUTPUT_FILENAME = '09-wip-02';
//////////////////////

// config
const WIDTH = 540;
const HEIGHT = 540;
/////////////////////

// locals
let recorder: Recorder;
// let img;
let viewport = new Vector(0, 0);
// let leftBoundary = 0;
// let rightBoundary = WIDTH;
// let spawnCenter = WIDTH / 2;
// let spawnWidth = WIDTH;
// const noise2D = makeNoise2D(Date.now());
const vines: Vine[] = [];
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  // img = loadImage('tiled-brick-texture-1-3135553547.png');
}

function setup() {
  createCanvas(WIDTH, HEIGHT /*, WEGL*/);
  pixelDensity(1);
  frameRate(60);
  noStroke();
  fill(0);

  vines.push(new Vine(NUM_START_BRANCHES, '#5a3034', 'red'));
  // vines.push(new Vine(NUM_START_BRANCHES, '#9a7074', 'blue'));
}

function draw() {
  background('#fff1dd');
  translate(viewport.x, viewport.y);
  // image(img, 0, 0, width, height);
  vines.forEach((v) => v.step(MAX_DISTANCE, MIN_DISTANCE));
  const lowestY = vines.map((v) => v.lowestY).reduce((a, b) => Math.min(a, b), height);
  viewport.y = (lowestY - height * 0.25) * -1;
  vines.forEach((v) => v.cleanup(viewport));
  vines.forEach((v) => v.draw());
  recorder.step();
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  noLoop();
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
