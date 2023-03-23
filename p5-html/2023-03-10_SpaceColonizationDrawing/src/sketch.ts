/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Shader, Vector, Graphics } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { AttractionPoint } from './AttractionPoint';
import { Branch } from './Branch';
import { makeNoise2D } from 'open-simplex-noise';
import { Vine } from './Vine';

// sketch constants
const MIN_DISTANCE = 1;
const MAX_DISTANCE = 30;
const NUM_START_BRANCHES = 2;
const ATTRACTION_POINTS_EXTRA = 2000;
const ATTRACTION_POINTS = 3000;
const BRANCHES = 100;
///////////////////

// record
const FPS = 30;
const SHOULD_RECORD = true;
const RECORD_FRAMES = 800;
const OUTPUT_FILENAME = '09';
//////////////////////

// config
const WIDTH = 540;
const HEIGHT = 540;
/////////////////////
enum Stage {
  AttractionPointDrawing,
  BranchDrawing,
  Running,
}
// locals
let recorder: Recorder;
// let img;
let viewport = new Vector(0, 0);
// let leftBoundary = 0;
// let rightBoundary = WIDTH;
// let spawnCenter = WIDTH / 2;
// let spawnWidth = WIDTH;
// const noise2D = makeNoise2D(Date.now());
let pg: Graphics;
let stage = Stage.Running;
const vines: Vine[] = [];
const attractionPointLocations: { v: Vector; sproutFlower: boolean }[] = [];
const branchPositions: Vector[] = [];
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME, false, 2);
  // img = loadImage('tiled-brick-texture-1-3135553547.png');
}

function setup() {
  createCanvas(WIDTH, HEIGHT /*, WEGL*/);
  pixelDensity(2);
  frameRate(60);
  noStroke();
  fill(0);
  pg = createGraphics(WIDTH, HEIGHT);
  pg.background(255);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(120);
  pg.textStyle(BOLD);
  pg.stroke(0);
  pg.fill(255);
  pg.strokeWeight(5);
  pg.text('Genuary # 9', 0, 0, width, height);
  // pg.textSize(115);
  // pg.text('Genuary #9', 0, 0, width, height);
  while (attractionPointLocations.length < ATTRACTION_POINTS) {
    const v = new Vector(random(width), random(height));
    const c = pg.get(v.x, v.y);
    if (red(c) + green(c) + blue(c) === 255 * 3) continue;
    attractionPointLocations.push({ v, sproutFlower: true });
    // console.log(attractionPointLocations.length);
  }
  for (let i = 0; i < ATTRACTION_POINTS_EXTRA; i++) {
    attractionPointLocations.push({ v: new Vector(random(width), random(height)), sproutFlower: false });
  }
  while (branchPositions.length < BRANCHES) {
    const v = new Vector(random(width), random(height));
    if (v.x > width * 0.1 && v.x < width * 0.9) continue;
    if (v.y > height * 0.1 && v.y < height * 0.9) continue;
    // const c = pg.get(v.x, v.y);
    // if (red(c) + green(c) + blue(c) === 255 * 3) continue;
    branchPositions.push(v);
    // console.log(attractionPointLocations.length);
  }

  // vines.push(new Vine(NUM_START_BRANCHES, '#5a3034', 'red'));
  // vines.push(new Vine(NUM_START_BRANCHES, '#9a7074', 'blue'));
  background('#fff1dd');

  vines.push(new Vine('#5a3034', 'red', attractionPointLocations, branchPositions));
}

function draw() {
  // background('#fff1dd');
  // image(pg, 0, 0);
  // if (!recorder.encoder) return;
  if (stage === Stage.Running) {
    // translate(viewport.x, viewport.y);
    // // image(img, 0, 0, width, height);
    vines.forEach((v) => v.step(MAX_DISTANCE, MIN_DISTANCE));
    // const lowestY = vines.map((v) => v.lowestY).reduce((a, b) => Math.min(a, b), height);
    // viewport.y = (lowestY - height * 0.25) * -1;
    vines.forEach((v) => v.cleanup(viewport));
    vines.forEach((v) => v.draw());
    recorder.step();
  } else {
    // if (mouseIsPressed) {
    //   if (stage === Stage.AttractionPointDrawing) attractionPointLocations.push(new Vector(mouseX, mouseY));
    //   else if (stage === Stage.BranchDrawing) branchPositions.push(new Vector(mouseX, mouseY));
    // }
    // fill('red');
    // for (const ap of attractionPointLocations) {
    //   circle(ap.v.x, ap.v.y, 5);
    // }
    // fill('brown');
    // for (const v of branchPositions) {
    //   circle(v.x, v.y, 5);
    // }
  }
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  // if (stage === Stage.AttractionPointDrawing) {
  //   attractionPointLocations.push(new Vector(mouseX, mouseY));
  // } else if (stage === Stage.BranchDrawing) {
  //   branchPositions.push(new Vector(mouseX, mouseY));
  // }

  noLoop();
}

function keyPressed(event: unknown) {
  // console.log('===========================');
  // console.log(event);
  // console.log('===========================');
  if (event.key === 'a') {
    stage = Stage.AttractionPointDrawing;
  } else if (event.key === 'b') {
    stage = Stage.BranchDrawing;
  } else if (event.key === ' ') {
    stage = Stage.Running;
    vines.push(new Vine('#5a3034', 'red', attractionPointLocations, branchPositions));
  }

  // console.log('===========================');
  // console.log(stage);
  // console.log('===========================');
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
window.keyPressed = keyPressed;
//#endregion
