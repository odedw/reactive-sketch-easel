/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Shader, Vector } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { AttractionPoint } from './AttractionPoint';
import { Branch } from './Branch';
import { makeNoise2D } from 'open-simplex-noise';

// sketch constants
const MIN_DISTANCE = 10;
const MAX_DISTANCE = 30;
const NUM_START_BRANCHES = 20;
///////////////////

// record
const FPS = 30;
const SHOULD_RECORD = false;
const RECORD_FRAMES = FPS * 30;
const OUTPUT_FILENAME = '09-wip-02';
//////////////////////

// config
const WIDTH = 540;
const HEIGHT = 540;
/////////////////////

// locals
let recorder: Recorder;
let attractionPoints: AttractionPoint[] = [];
let branches: Branch[] = [];
let img;
let lowestY = HEIGHT;
let viewport = new Vector(0, 0);
// let leftBoundary = 0;
// let rightBoundary = WIDTH;
let spawnCenter = WIDTH / 2;
let spawnWidth = WIDTH;
const noise2D = makeNoise2D(Date.now());
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  img = loadImage('tiled-brick-texture-1-3135553547.png');
}

function setup() {
  createCanvas(WIDTH, HEIGHT /*, WEGL*/);
  pixelDensity(1);
  frameRate(60);
  noStroke();
  fill(0);
  for (let i = 0; i < 1000; i++) {
    attractionPoints.push(new AttractionPoint(new Vector(random(width), random(height))));
  }

  for (let i = 0; i < NUM_START_BRANCHES; i++) {
    branches.push(
      // new Branch(null, new Vector((i + 1) * (width / (NUM_START_BRANCHES + 1)), height), new Vector(0, -1))
      new Branch(null, new Vector(random(width), random(height / 2, height)), new Vector(0, -1))
    );
  }
}

function draw() {
  background('#fff1dd');
  translate(viewport.x, viewport.y);
  // image(img, 0, 0, width, height);

  // find closest branch for each attraction point
  for (let i = 0; i < attractionPoints.length; i++) {
    const ap = attractionPoints[i];
    let closestBranch = null;
    let minDistance = MAX_DISTANCE;
    for (let j = 0; j < branches.length; j++) {
      const branch = branches[j];
      var d = Vector.dist(ap.pos, branch.pos);
      if (d < MIN_DISTANCE) {
        ap.reached = true;
        closestBranch = null;
        branch.dead = true;
        break;
      } else if (d < minDistance) {
        closestBranch = branch;
        minDistance = d;
      }
    }

    // if found add direction
    if (closestBranch != null) {
      var newDir = Vector.sub(ap.pos, closestBranch.pos);
      newDir.normalize();
      closestBranch.dir.add(newDir);
      closestBranch.count++;
    }
  }

  // sprout new branches
  for (let i = branches.length - 1; i >= 0; i--) {
    const branch = branches[i];
    if (branch.count > 0) {
      const newBranch = branch.sprout();
      if (newBranch.pos.y < lowestY) {
        lowestY = newBranch.pos.y;
        updateViewport();
      }
      branches.push(newBranch);
    }
  }

  cleanup();

  // console.log(branches.length);

  // attractionPoints.forEach((a) => a.draw());
  branches.forEach((b) => b.draw());

  fill('red');
  noStroke();
  // circle(leftBoundary, -viewport.y, 40);
  // circle(rightBoundary, -viewport.y, 40);
  // leftBoundary = map(noise2D(frameCount / 100, 0), -1, 1, 0, width * 0.9);
  // rightBoundary = map(noise2D(frameCount / 100, 1000), -1, 1, leftBoundary + width * 0.1, width);
  spawnCenter = map(noise2D(frameCount / 100, 0), -1, 1, 0.1, width * 0.9);
  spawnWidth = map(noise2D(frameCount / 100, 1000), -1, 1, width * 0.2, width);
  // rect(spawnCenter - spawnWidth / 2, -viewport.y, spawnWidth, 10);
  recorder.step();
}

function updateViewport() {
  viewport.y = (lowestY - height * 0.25) * -1;
  for (let j = 0; j < 4; j++) {
    attractionPoints.push(
      new AttractionPoint(new Vector(random(-spawnWidth / 2, spawnWidth / 2) + spawnCenter, lowestY - height * 0.25))
    );
  }
}

function cleanup() {
  // remove attraction points that were reached
  for (let i = attractionPoints.length - 1; i >= 0; i--) {
    if (attractionPoints[i].reached) {
      attractionPoints.splice(i, 1);
    }
  }

  for (let i = branches.length - 1; i >= 0; i--) {
    if (branches[i].pos.y + viewport.y > height * 1.1) {
      branches.splice(i, 1);
    }
  }
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
