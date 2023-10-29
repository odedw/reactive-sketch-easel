/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics, Shader, Vector } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { generateSuprematismImage, generateTemplate, randomizeColors, setNumShapes } from './suprematismGenerator';
import { Input, init, listInputs } from './midi';
import { cartesianToPolar, polarToCartesian } from '../../utils/math';
// sketch constants
// const CONSTANT = 10;
///////////////////

// record
const FPS = 60;
const SHOULD_RECORD = false;
const RECORD_FRAMES = 60;
const OUTPUT_FILENAME = 'square';
const MIDI_IN = '3- Launch Control XL';
//////////////////////

// config
const WIDTH = 600;
const HEIGHT = 600;
/////////////////////

// locals
let recorder: Recorder;
// let theShader: Shader;
let points: Vector[] = [];
let transformedPoints: Vector[] = [];
let a = 0;
let r = 0;
let pg: Graphics;
let showPoints = false;
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
  transformedPoints = points.map((p) => p.copy());
  generateTemplate();
  init().then(() => {
    listInputs();
    const input = new Input(MIDI_IN);
    input.midiInput?.addListener('controlchange', (e) => {
      if (e.controller.number === 77) {
        const v = map(e.value as number, 0, 1, 0, 20);
        setNumShapes(v);
      } else if (e.controller.number === 50) {
        a = map(e.value as number, 0, 1, 0, TWO_PI);
        applyTransform();
      } else if (e.controller.number === 78) {
        r = map(e.value as number, 0, 1, -0.5, 0.5);
        applyTransform();
      } else {
        console.log(e.controller.number, e.value);
      }
    });
    input.midiInput?.addListener('noteon', (e) => {
      if (e.note.name === 'F' && e.note.octave === 2) {
        randomizeColors();
      } else {
        console.log(e);
      }
    });
  });
}

function draw() {
  background(0);
  // @ts-ignore
  generateSuprematismImage(transformedPoints, pg, showPoints);
  image(pg, 0, 0);
  recorder.step();
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  showPoints = !showPoints;
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;

function applyTransform() {
  points.forEach((p, i) => {
    const polar = cartesianToPolar(p.x - 0.5, p.y - 0.5);
    polar.a += a;
    polar.r += r;
    const { x, y } = polarToCartesian(polar.r, polar.a);
    transformedPoints[i].x = x + 0.5;
    transformedPoints[i].y = y + 0.5;
  });
}
//#endregion
