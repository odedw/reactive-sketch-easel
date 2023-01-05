/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Shader, Graphics, MediaElement, Color } from 'p5';

const VIDEO_NAME = 'PXL_20221204_170009451.TS.mp4';
const VIDEO_FPS = 30.01923;
let diffShader: Shader;

// the camera variable
// let cam: Element;
let vid: MediaElement;

// we need one extra createGraphics layer for the previous video frame
let prevFrame: Graphics;
let currentFrame: Graphics;
let frameIndex: number = 0;
let vidTime = 0;
let palette = [];
let playing = false;
function preload() {
  // load the shader
  diffShader = loadShader('effect.vert', 'effect.frag');
}

function convertColorToShaderColor(colorString: string) {
  const c = color(colorString);
  return [red(c) / 255.0, green(c) / 255.0, blue(c) / 255.0];
}
function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  palette = ['#ff55ff', '#55ffff', '#ffffff'].map(convertColorToShaderColor);
  noStroke();

  // the prevFrame layer doesn't need to be WEBGL
  prevFrame = createGraphics(windowWidth, windowHeight);
  currentFrame = createGraphics(windowWidth, windowHeight);

  // initialize the webcam at the window size
  // cam = createCapture(VIDEO);
  // cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  // cam.hide();

  vid = createVideo('PXL_20221204_170009451.TS.mp4');
  vid.size(windowWidth, windowHeight);
  vid.hide();
  vid.time(0);

  diffShader.setUniform('uWidth', width);
  diffShader.setUniform('uHeight', height);
}

function draw() {
  palette.forEach((c, i) => diffShader.setUniform(`ucolor${i + 1}`, c));

  shader(diffShader);
  currentFrame.copy(vid, 0, 0, width, height, 0, 0, width, height);
  diffShader.setUniform('tex0', currentFrame);
  diffShader.setUniform('tex1', frameCount === 0 ? currentFrame : prevFrame);
  diffShader.setUniform('uframe_count', frameCount);
  diffShader.setUniform('uTime', frameCount);
  rect(0, 0, width, height);

  if (frameCount % 3 == 0) nextFrame();
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  if (!playing) {
    vid.play();
    vid.pause();
    playing = true;
  }
}

function nextFrame() {
  prevFrame.copy(vid, 0, 0, width, height, 0, 0, width, height);
  const frameTime = 1 / VIDEO_FPS;
  frameIndex++;
  const time = frameIndex * frameTime + 0.5 * frameTime;
  vid.time(time);
  console.log(time);
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
