/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics, Shader } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import './hand';
import { createHandLandmarker, drawHand, enableCam, getLandmarks } from './hand';

// sketch constants
const ENABLE_HAND = false;
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
let drawingFrame: Graphics;
let modelResult: any;

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

  // @ts-ignore
  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();

  handInit();
}

function draw() {
  // background(0);
  resetShader();
  if (mouseIsPressed) {
    line(pmouseX - width / 2, pmouseY - height / 2, mouseX - width / 2, mouseY - height / 2);
  }

  handDraw();

  // @ts-ignore
  prevFrame.image(get(), 0, 0);
  shader(theShader);
  theShader.setUniform('u_resolution', [1.0 / width, 1.0 / height]);
  theShader.setUniform('u_texture', prevFrame);
  rect(-width / 2, -height / 2, width, height);
}

function handInit() {
  if (!ENABLE_HAND) return;
  createHandLandmarker().then(() => {
    enableCam();
  });
}
function handDraw() {
  if (!ENABLE_HAND) return;
  // hand recognition
  modelResult = getLandmarks();
  if (modelResult.landmarks?.length) {
    drawHand(modelResult);
  }
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
