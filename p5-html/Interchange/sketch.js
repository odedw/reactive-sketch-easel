/// <reference path="../../node_modules/@types/p5/global.d.ts" />
const WIDTH = 540;
const HEIGHT = 540;
const SHOULD_RECORD = false;
const RECORD_TIME = 1;
const FPS = 30;

const SIZE = 8;
const GAP = 8;
const MIN_SEGMENT_SIZE = SIZE * 2;
const MAX_SEGMENT_SIZE = SIZE * 4;

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

  let x = 0; //random(-SIZE, 0);
  while (x < width + GAP) {
    let c = random(RANDOM_PALETTE); // lerpColor(color('darkred'), color('blue'), x / width);
    const t = new Track(x, SIZE, random(-1, 1), true, c);
    vertical.push(t);
    x += t.size + GAP;
  }
  let y = 0;
  while (y < height + GAP) {
    let c = random(RANDOM_PALETTE); // lerpColor(color('darkred'), color('blue'), x / width);
    const t = new Track(y, SIZE, random(-1, 1), false, c);
    horizontal.push(t);
    y += t.size + GAP;
  }
  // horizontal.push(new Track(width / 2, SIZE, 0.5, false, 'white'));
}

function draw() {
  background(0);
  stroke(0);
  strokeWeight(1);
  for (let t of vertical) {
    t.update();
    t.draw();
  }
  for (let t of horizontal) {
    t.update();
    t.draw();
  }

  recorderStep();
}

function mouseClicked(event) {
  console.log('frameCount', frameCount);
}
