/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics, Shader, Vector } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { generateSuprematismImage, generateTemplate } from './suprematismGenerator';

// sketch constants
// const CONSTANT = 10;
///////////////////

// record
const FPS = 60;
const SHOULD_RECORD = false;
const RECORD_FRAMES = 60;
const OUTPUT_FILENAME = 'square';
//////////////////////

// config
const WIDTH = 540;
const HEIGHT = 540;
/////////////////////

// locals
let recorder: Recorder;
// let theShader: Shader;
let points: Vector[] = [];
let pg: Graphics;
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  // theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(WIDTH, HEIGHT /*, WEGL*/);
  pixelDensity(1);
  frameRate(60);
  noStroke();
  fill(255);
  // @ts-ignore
  pg = createGraphics(WIDTH, HEIGHT);
  for (let i = 0; i < 21; i++) {
    points.push(new Vector(random(), random()));
  }
  generateTemplate();
}

function draw() {
  background(0);
  // @ts-ignore
  generateSuprematismImage(points, pg);
  image(pg, 0, 0);
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
