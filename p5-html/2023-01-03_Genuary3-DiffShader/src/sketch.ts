/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Shader, Graphics, MediaElement, Color } from 'p5';

const SHOULD_RECORD = false;
const VIDEO_FRAME_LENGTH = 900;
const VIDEO_NAME = '20210131_154534.mp4';
const VIDEO_FPS = 29.990196;
const WIDTH = 960;
const HEIGHT = 540;
const frameTime = 1 / VIDEO_FPS;

let diffShader: Shader;

// the camera variable
// let cam: Element;
let vid: MediaElement;

// we need one extra createGraphics layer for the previous video frame
let prevFrame: Graphics;
let currentFrame: Graphics;
let frameIndex: number = 0;
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
  createCanvas(WIDTH, HEIGHT, WEBGL);
  palette = ['#ff55ff', '#55ffff', '#ffffff'].map(convertColorToShaderColor);
  noStroke();

  // the prevFrame layer doesn't need to be WEBGL
  prevFrame = createGraphics(width, height);
  currentFrame = createGraphics(width, height);

  // initialize the webcam at the window size
  // cam = createCapture(VIDEO);
  // cam.size(windowWidth, height);

  // hide the html element that createCapture adds to the screen
  // cam.hide();

  vid = createVideo(VIDEO_NAME);
  vid.size(width, height);
  vid.hide();
  vid.time(0);

  diffShader.setUniform('uWidth', width);
  diffShader.setUniform('uHeight', height);
}

function draw() {
  palette.forEach((c, i) => diffShader.setUniform(`ucolor${i + 1}`, c));

  shader(diffShader);
  currentFrame.copy(vid, 0, 0, width, height, 0, 0, width, height);

  rect(0, 0, width, height);

  if (frameCount % 10 == 0) nextFrame();
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  if (!playing) {
    vid.play();
    vid.pause();
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
  diffShader.setUniform('tex0', currentFrame);
  diffShader.setUniform('tex1', frameCount === 0 ? currentFrame : prevFrame);
  diffShader.setUniform('uframe_count', frameCount);
  diffShader.setUniform('uTime', frameCount);
  diffShader.setUniform('u_random1', random(100));
  diffShader.setUniform('u_random2', random(100));
  diffShader.setUniform('u_random3', random(100));
  frameIndex++;
  // const time = frameIndex * frameTime + 0.5 * frameTime;
  // vid.time(time);
  document.getElementsByTagName('video')[0].seekToNextFrame();
  if (frameIndex > VIDEO_FRAME_LENGTH) {
    console.log('done');
    noLoop();
  }
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
