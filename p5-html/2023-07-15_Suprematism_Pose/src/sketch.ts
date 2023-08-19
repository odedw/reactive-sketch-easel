/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics } from 'p5';

import { Recorder } from '../../utils/Recorder';
import { generateSuprematismImage, generateTemplate } from './suprematismGenerator';
import { createHandLandmarker, enableCam, getLandmarks } from './model';

// sketch constants
// const CONSTANT = 10;
// const IMAGE_NAME = 'abstract-white-canvas-textures-surface.jpg';
// const VIDEO_NAME = 'production_id_3873059 (360p).mp4';
///////////////////

// record
const FPS = 60;
const SHOULD_RECORD = false;
const RECORD_FRAMES = 60;
const OUTPUT_FILENAME = 'square';
//////////////////////

// config
const WIDTH = 800;
const HEIGHT = 600;
/////////////////////

// locals
let recorder: Recorder;
// let theShader: Shader;
// let img: Image;
// let inputFrame: Graphics;
let frame: Graphics;
let regeneratedSinceLastClearCanvas = false;
// let capture: Element;
let freeze = false;
let modelResult: any;
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  // theShader = loadShader('shader.vert', 'shader.frag');
  // img = loadImage(IMAGE_NAME) as Image;
}

function setup() {
  createCanvas(WIDTH, HEIGHT /*, WEGL*/);
  pixelDensity(1);
  frameRate(60);
  noStroke();
  fill(255);
  rectMode(CENTER);
  ellipseMode(CENTER);
  // @ts-ignore
  frame = createGraphics(WIDTH, HEIGHT);
  // @ts-ignore
  // inputFrame = createGraphics(WIDTH, HEIGHT);
  // capture = createCapture(VIDEO);
  // capture.hide();
  createHandLandmarker().then(() => {
    enableCam();
  });
}

function draw() {
  scale(-1, 1);
  translate(-width, 0);
  if (!freeze) {
    modelResult = getLandmarks();
  }
  if (!modelResult.landmarks?.length) {
    if (!regeneratedSinceLastClearCanvas) {
      generateTemplate();
      regeneratedSinceLastClearCanvas = true;
      console.log('regenerated template');
    }
  } else {
    regeneratedSinceLastClearCanvas = false;
  }
  generateSuprematismImage(modelResult, frame); //, img, capture);
  image(frame, 0, 0, WIDTH, HEIGHT);

  recorder.step();
}

function mouseClicked() {
  console.log('frameCount', frameCount);
  console.log('===========================');
  console.log(getLandmarks());
  console.log('===========================');
}

function keyPressed(event: any) {
  // console.log('===========================');
  // console.log(event);
  // console.log('===========================');
  if (event.key === ' ') {
    freeze = !freeze;
  }

  // console.log('===========================');
  // console.log(stage);
  // console.log('===========================');
}

//#region add globals
// @ts-ignore
window.preload = preload;
// @ts-ignore
window.setup = setup;
// @ts-ignore
window.draw = draw;
window.mouseClicked = mouseClicked;
window.keyPressed = keyPressed;
//#endregion
