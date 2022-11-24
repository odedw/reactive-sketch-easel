/// <reference path="../../node_modules/@types/p5/global.d.ts" />
const WIDTH = 540;
const HEIGHT = 540;
const SHOULD_RECORD = false;
const RECORD_TIME = 1;
const FPS = 30;

function preload() {
  preloadRecorder();
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(FPS);
}

function draw() {
  background(220);

  recorderStep();
}

function mouseClicked(event) {
  console.log('frameCount', frameCount);
}
