/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Shader, Graphics, MediaElement, Color, Vector } from 'p5';
import { preloadRecorder, recorderStep } from '../../utils/recorder.ts';

const MIN_DISTANCE = 12;
const SHOULD_RECORD = true;
const RECORD_TIME = 10;

const VIDEO_FRAME_LENGTH = 900;
const VIDEO_NAME = '20210131_154534.mp4';
const VIDEO_FPS = 29.990196;
const WIDTH = 960;
const HEIGHT = 540;
const frameTime = 1 / VIDEO_FPS;

// the camera variable
// let cam: Element;
let vid: MediaElement;

// we need one extra createGraphics layer for the previous video frame
let prevFrame: Graphics;
let currentFrame: Graphics;
let frameIndex: number = 0;
let palette = ['#ff55ff', '#55ffff', '#ffffff'];
let playing = false;
function preload() {
  // if (SHOULD_RECORD) preloadRecorder(RECORD_TIME, VIDEO_FPS);
}

function setup() {
  window.drawingContext = drawingContext;
  createCanvas(WIDTH, HEIGHT);
  pixelDensity(1);
  noStroke();

  prevFrame = createGraphics(width, height);
  currentFrame = createGraphics(width, height);

  vid = createVideo(VIDEO_NAME);
  vid.size(width, height);
  vid.hide();
  vid.time(0);
}

function draw() {
  // console.log(frameCount);
  if (frameCount % 1 === 0) {
    currentFrame.copy(vid, 0, 0, width, height, 0, 0, width, height);
    image(currentFrame, 0, 0, width, height);
    loadPixels();
    currentFrame.loadPixels();
    prevFrame.loadPixels();
    for (let index = 0; index < pixels.length; index += 4) {
      const c = color(random(palette));
      const vec1 = new Vector(prevFrame.pixels[index], prevFrame.pixels[index + 1], prevFrame.pixels[index + 2]);
      const vec2 = new Vector(
        currentFrame.pixels[index],
        currentFrame.pixels[index + 1],
        currentFrame.pixels[index + 2]
      );
      const d = dist(vec1.x, vec1.y, vec1.z, vec2.x, vec2.y, vec2.z);
      if (d > MIN_DISTANCE) {
        pixels[index] = red(c);
        pixels[index + 1] = green(c);
        pixels[index + 2] = blue(c);
      }
    }
    updatePixels();
    nextFrame();
  }
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  if (!playing) {
    playing = true;
    loop();
  } else {
    noLoop();
  }
}

function downloadFrame() {
  var link = document.createElement('a');
  link.download = `frame-${frameIndex}.png`;
  link.href = document.getElementById('defaultCanvas0').toDataURL('image/jpg');
  link.click();
}

function nextFrame() {
  if (SHOULD_RECORD) downloadFrame();
  prevFrame.copy(vid, 0, 0, width, height, 0, 0, width, height);
  frameIndex++;

  document.getElementsByTagName('video')[0].seekToNextFrame();
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
