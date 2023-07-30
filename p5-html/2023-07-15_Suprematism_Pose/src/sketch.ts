/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics, Image, MediaElement, Vector } from 'p5';

import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { Pose } from '@tensorflow-models/pose-detection';
import { generateSuprematismImage } from './suprematismGenerator';
import { enableCam, createGestureRecognizer, getGestures } from './gesture';

// sketch constants
// const CONSTANT = 10;
const IMAGE_NAME = 'photo-1524160741206-983df146510a.jpg';
const VIDEO_NAME = 'production_id_3873059 (360p).mp4';
///////////////////

// record
const FPS = 60;
const SHOULD_RECORD = false;
const RECORD_FRAMES = 60;
const OUTPUT_FILENAME = 'square';
//////////////////////

// config
const WIDTH = 480;
const HEIGHT = 360;
/////////////////////

// locals
let recorder: Recorder;
// let theShader: Shader;
let img: Image;
let poses: Pose[] = [];
let inputFrame: Graphics;
let frame: Graphics;

////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  // theShader = loadShader('shader.vert', 'shader.frag');
  img = loadImage(IMAGE_NAME) as Image;
}

function setup() {
  createCanvas(WIDTH, HEIGHT /*, WEGL*/);
  pixelDensity(1);
  frameRate(60);
  noStroke();
  fill(255);
  // @ts-ignore
  frame = createGraphics(WIDTH, HEIGHT);
  // @ts-ignore
  inputFrame = createGraphics(WIDTH, HEIGHT);

  createGestureRecognizer().then((gestureRecognizer) => {
    enableCam();
  });
}

function draw() {
  background(200);
  fill(0);
  scale(-1, 1);
  translate(-width, 0);
  const gestureResult = getGestures();
  gestureResult?.landmarks?.[0]?.forEach((landmark: any) => {
    const { x, y } = landmark;
    ellipse(x * width, y * height, 10, 10);
  });
  // image(frame, 0, 0, WIDTH, HEIGHT);

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
