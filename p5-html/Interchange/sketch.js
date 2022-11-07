/// <reference path="../../node_modules/@types/p5/global.d.ts" />
const SIZE = 8;
const GAP = 8;
const MIN_SEGMENT_SIZE = SIZE * 2;
const MAX_SEGMENT_SIZE = SIZE * 4;

const frate = 30; // frame rate
const numFrames = frate * 30; // num of frames to record
let recording = false;
let recordedFrames = 0;
let cwidth = 540;
let cheight = 540;
let encoder;

const vertical = [];
const horizontal = [];
// make sure encoder is ready before use
function preload() {
  HME.createH264MP4Encoder().then((enc) => {
    encoder = enc;
    encoder.outputFilename = 'test';
    encoder.width = cwidth * pixelDensity();
    encoder.height = cheight * pixelDensity();
    encoder.frameRate = frate;
    encoder.kbps = 50000; // video quality
    encoder.groupOfPictures = 10; // lower if you have fast actions.
    encoder.initialize();
  });
}

function setup() {
  createCanvas(cwidth, cheight);

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

  // keep adding new frame
  if (recording) {
    encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);
    recordedFrames++;
    if (recordedFrames % 100 === 0) {
      console.log(`Recorded ${recordedFrames} of ${numFrames} frames`);
    }
  }
  // finalize encoding and export as mp4
  if (recordedFrames === numFrames) {
    recording = false;
    recordedFrames = 0;
    console.log('recording stopped');

    encoder.finalize();
    const uint8Array = encoder.FS.readFile(encoder.outputFilename);
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }));
    anchor.download = encoder.outputFilename;
    anchor.click();
    encoder.delete();
    noLoop();
  }
}
