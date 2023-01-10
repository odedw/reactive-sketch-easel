/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { BLEND_MODE, Color, Graphics, Shader } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { Particle } from './Particle';

// sketch constants
const NUM_CIRCLES_AXIS = 10;
const CIRCLE_SIZE = 20;
let COLORS: number[][] = [];
///////////////////

// record
const SHOULD_RECORD = false;
const FPS = 60;
const RECORD_FRAMES = 60 * 10;
const OUTPUT_FILENAME = '04-intersection';
//////////////////////

// config
const WIDTH = 540;
const HEIGHT = 540;
/////////////////////

// locals
let recorder: Recorder;
let particles: Particle[] = [];
let circleShader: Shader;
let pg: Graphics;
let particleSizes: number[];
let particleXs: number[];
let particleYs: number[];
////////////////////

function createColorTexture(colors: Color[]): Graphics {
  const palette = createGraphics(colors.length, 1);
  palette.strokeWeight(1);
  palette.noFill();
  colors.forEach((c, i) => {
    palette.stroke(c);
    palette.point(i, 0);
  });
  return palette;
}
function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  circleShader = loadShader('shader.vert', 'shader.frag');
  COLORS = ['#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4']
    .map((s) => color(s))
    .map((c) => [red(c) / 255.0, green(c) / 255.0, blue(c) / 255.0, 1.0]);
}

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  // blendMode(blendModes[blendIndex]);
  frameRate(60);
  pg = createGraphics(width, height);
  for (let x = 0; x <= width; x += width / (NUM_CIRCLES_AXIS - 1)) {
    for (let y = 0; y <= height; y += height / (NUM_CIRCLES_AXIS - 1)) {
      particles.push(
        new Particle(
          floor(x),
          floor(y),
          color(random(255), random(255), random(255), 0),
          Modulate.createSineLfo(FPS * 20, {
            from: CIRCLE_SIZE * 0.5,
            to: CIRCLE_SIZE * 20,
            phase: -x / 10 - y / 10,
          })
        )
      );
    }
  }
  particleXs = particles.map((p) => p.x / width);
  particleYs = particles.map((p) => p.y / height);
}

function draw() {
  pg.background(0);
  for (let p of particles) p.draw(pg);
  shader(circleShader);
  circleShader.setUniform('u_xcoords', particleXs);
  circleShader.setUniform('u_ycoords', particleYs);
  particleSizes = particles.map((p) => p.lfo.get() / width);
  circleShader.setUniform('u_size', particleSizes);
  circleShader.setUniform('u_texture', pg);
  circleShader.setUniform('u_resolution', [width, height]);
  COLORS.forEach((c, i) => circleShader.setUniform(`u_color${i + 1}`, c));
  rect(-width / 2, -height / 2, width, height);

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
