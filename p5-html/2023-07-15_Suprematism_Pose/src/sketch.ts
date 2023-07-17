/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics, Image, MediaElement, Vector } from 'p5';

import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { getPoses, init } from './PoseDetector';
import { Pose } from '@tensorflow-models/pose-detection';
import { generateSuprematismImage } from './suprematismGenerator';

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
const WIDTH = 640;
const HEIGHT = 360;
/////////////////////

// locals
let recorder: Recorder;
// let theShader: Shader;
let img: Image;
let poses: Pose[] = [];
let inputFrame: Graphics;
let frame: Graphics;
let vid: MediaElement;
let initPromise: Promise<void>;

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

  vid = createVideo(VIDEO_NAME);
  vid.size(width, height);
  vid.hide();
  vid.time(0);

  initPromise = init();
  generatePoseForNextFrame();
}

function draw() {
  image(frame, 0, 0, WIDTH, HEIGHT);

  recorder.step();
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
}

function generatePoseForNextFrame() {
  initPromise
    .then(() => {
      inputFrame.copy(vid, 0, 0, width, height, 0, 0, inputFrame.width, inputFrame.height);
      inputFrame.loadPixels();
      let imgDataArray = new Uint8ClampedArray(inputFrame.pixels); // Convert to a typed array
      let imageData = new ImageData(imgDataArray, width, height);
      // Get the poses
      return getPoses(imageData);
    })
    .then((p) => {
      poses = p;
      // console.log('===========================');
      // console.log(poses);
      // console.log('===========================');
      generateSuprematismImage(poses, frame, inputFrame);
      document
        .getElementsByTagName('video')[0]
        .seekToNextFrame()
        .then(() => {
          generatePoseForNextFrame();
        });
    })
    .catch((err) => {
      console.log('===========================');
      console.log(err);
      console.log('===========================');
    });
}
//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
