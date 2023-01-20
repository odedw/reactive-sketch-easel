/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Color, Graphics, Shader } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { Particle } from './Particle';
import tinycolor from 'tinycolor2';

// sketch constants
const NUM_PARTICLES = 30;
///////////////////

// record
const FPS = 60;
const SHOULD_RECORD = false;
const RECORD_FRAMES = FPS * 20;
const OUTPUT_FILENAME = '08';
//////////////////////

// config
const WIDTH = 540;
const HEIGHT = 540;
/////////////////////

// locals
let recorder: Recorder;
let particles: Particle[] = [];
let theShader: Shader;
let pg: Graphics;
let c1: Color, c2: Color;
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME, true);
  theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  smooth();
  c1 = color('#6D18EA');
  let tc = tinycolor({ r: red(c1), g: green(c1), b: blue(c1) })
    .complement()
    .toHexString();
  // console.log(tc);
  c2 = color(tc);
  frameRate(SHOULD_RECORD ? 5 : FPS);
  noStroke();
  fill(255);

  for (let i = 0; i < NUM_PARTICLES; i++) {
    const x = random(0.1, 0.4);
    const y = random(0.1, 0.4);
    const phaseX = floor(random(FPS * 10));
    const phaseY = floor(random(FPS * 20));
    const phaseS = floor(random(FPS * 10));
    particles.push(
      new Particle(
        Modulate.createSineLfo(10 * FPS, {
          from: width * x,
          to: width * (1 - x),
          phase: phaseX,
        }),
        Modulate.createSineLfo(20 * FPS, {
          from: height * y,
          to: height * (1 - y),
          phase: phaseY,
        }),
        Modulate.createSineLfo(10 * FPS, {
          from: -50,
          to: 30,
          phase: phaseS,
        })
      )
    );
    // console.log(phaseX, phaseY, phaseS);
  }

  pg = createGraphics(width, height);
}

function draw() {
  // pg.background(0);
  particles.forEach((p) => p.step());
  shader(theShader);

  theShader.setUniform(
    'u_coords',
    particles.flatMap((p) => [p.lfoX.get() / width, p.lfoY.get() / height, p.lfoS.get() / width])
  );
  theShader.setUniform('u_color1', [red(c1) / 255, green(c1) / 255, blue(c1) / 255]);
  theShader.setUniform('u_color2', [red(c2) / 255, green(c2) / 255, blue(c2) / 255]);

  rect(-width / 2, -height / 2, width, height);

  // image(pg, -width / 2, -height / 2, width, height);
  recorder.step();
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  c1 = color(random(255), random(255), random(255));
  let tc = tinycolor({ r: red(c1), g: green(c1), b: blue(c1) })
    .complement()
    .toHexString();
  c2 = color(tc);
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
