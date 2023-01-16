/// <reference path="../node_modules/@types/p5/global.d.ts" />
import p5, { Graphics, Image } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';

// sketch constants
const CHAR_SET = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
const CHAR_SIZE = 10;
const FILE_NAME = 'Jellyfish - 10480.mp4';
const INCREASE_BRIGHTNESS = 1;
///////////////////

// record
const SHOULD_RECORD = false;
const FPS = 24;
const RECORD_FRAMES = FPS * 60;
const OUTPUT_FILENAME = '06';
//////////////////////

// config
const WIDTH = 1280;
const HEIGHT = 720;
let lfo1 = Modulate.createSineLfo(6, { from: 20, to: 100 });
/////////////////////

// locals
let recorder: Recorder;
let pg: Graphics;
let img: Image;
let vid;
let capture: p5.Element;
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);

  // img = loadImage(FILE_NAME);
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  // capture = createCapture(VIDEO);
  // capture.size(WIDTH, HEIGHT);
  // console.log(capture.size());
  // capture.size(WIDTH / CHAR_SIZE, HEIGHT / CHAR_SIZE);
  // capture.hide();
  frameRate(FPS);
  noStroke();
  fill(255);
  pixelDensity(1);
  pg = createGraphics(WIDTH / CHAR_SIZE, HEIGHT / CHAR_SIZE);
  // pg.image(img, 0, 0, pg.width, pg.height);
  textSize(CHAR_SIZE * 1.5);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  vid = createVideo(FILE_NAME);
  vid.size(width, height);
  vid.hide();
  vid.time(0);
  // vid.play();
}

function draw() {
  background(0);
  pg.copy(vid, 0, 0, width, height, 0, 0, pg.width, pg.height);
  pg.loadPixels();
  for (let x = 0; x < pg.width; x++) {
    for (let y = 0; y < pg.height; y++) {
      const pixelIndex = (x + y * pg.width) * 4;
      let c = color(
        pg.pixels[pixelIndex] * INCREASE_BRIGHTNESS,
        pg.pixels[pixelIndex + 1] * INCREASE_BRIGHTNESS,
        pg.pixels[pixelIndex + 2] * INCREASE_BRIGHTNESS
      );
      // console.log(red(c), green(c), blue(c));
      const b = brightness(c);
      const charIndex = floor(map(b, 0, 255, CHAR_SET.length - 1, 0));
      fill(c);
      // console.log(x, y, charIndex, CHAR_SET[charIndex]);
      text(CHAR_SET[charIndex], (x / pg.width) * width + CHAR_SIZE / 2, (y / pg.height) * height + CHAR_SIZE / 2);
      // rect((x / pg.width) * width + CHAR_SIZE / 2, (y / pg.height) * height + CHAR_SIZE / 2, CHAR_SIZE, CHAR_SIZE);
    }
  }

  // image(capture, 0, 0, width, height);
  document.getElementsByTagName('video')[0].seekToNextFrame();

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
