/// <reference path="../../node_modules/@types/p5/global.d.ts" />
const WIDTH = 540;
const HEIGHT = 540;
const SHOULD_RECORD = false;
const RECORD_TIME = 30;
const FPS = 30;

const SIZE = 10;
const GAP = SIZE * 3;
const MIN_SEGMENT_SIZE = SIZE * 2;
const MAX_SEGMENT_SIZE = SIZE * 8;

let encoder;

const vertical = [];
const horizontal = [];
// make sure encoder is ready before use
function preload() {
  preloadRecorder();
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(FPS);
  rectMode(CENTER);
  let x = -SIZE / 2; //random(-SIZE, 0);
  while (x < width + GAP) {
    let c = random(PALETTE); // lerpColor(color('darkred'), color('blue'), x / width);
    const t = new Track(x, SIZE, random(-1, 1), true, c);
    vertical.push(t);
    x += t.size + GAP;
  }
  let y = -SIZE / 2;
  while (y < height + GAP) {
    let c = random(PALETTE); // lerpColor(color('darkred'), color('blue'), x / width);
    const t = new Track(y, SIZE, random(-1, 1), false, c);
    horizontal.push(t);
    y += t.size + GAP;
  }
  // horizontal.push(new Track(width / 2, SIZE, 0.5, false, 'white'));
}

function draw() {
  background(0);
  if (frameCount !== 0 && frameCount % FPS == 0) {
    // randomPalette();
  }
  stroke(0);
  strokeWeight(1);
  let i = 0;
  for (let t of vertical) {
    if (i++ % 2 == 0) {
      t.update();
      t.draw();
    }
  }
  i = 0;
  for (let t of horizontal) {
    if (i++ % 2 == 0) {
      t.update();
      t.draw();
    }
  }

  i = 0;
  for (let t of vertical) {
    if (i++ % 2 == 1) {
      t.update();
      t.draw();
    }
  }
  i = 0;
  for (let t of horizontal) {
    if (i++ % 2 == 1) {
      t.update();
      t.draw();
    }
  }

  recorderStep();
}

function mouseClicked(event) {
  randomColorForSeed(this);
  randomPalette();
  console.log('frameCount', frameCount);
}
