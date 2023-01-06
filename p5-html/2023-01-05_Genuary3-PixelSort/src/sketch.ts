/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics, Image, Vector } from 'p5';

const IMAGE_NAME = 'photo-1567309676325-2b237f42861f.jpg';
/*
photo-1567309676325-2b237f42861f.jpg
alexander-andrews-yOIT88xWkbg-unsplash.jpg
erik-jan-leusink-IcW2ooxn4N4-unsplash.jpg
jason-leung-UIZQfEZ1wUc-unsplash.jpg
michele-caliani-iLAAT1E-H_8-unsplash.jpg
pdfamousartists8-pdfamouspaintingetc10100013-image_2.jpg
*/
const WIDTH = 540;
const HEIGHT = 540;
const MIN_SEGMENT_SIZE = 10;
const MAX_SEGMENT_SIZE = 50;
const SHOULD_RECORD = true;
const RECORD_FRAMES = 900;
const FPS = 60;
let img: Image;
let pg: Graphics;
function preload() {
  img = loadImage(IMAGE_NAME) as Image;
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(FPS);
  pixelDensity(1);
  noStroke();
  fill(255);
  pg = createGraphics(width, height);
  pg.image(img, 0, 0, width, height);
  // pg.loadPixels();
  // for (let y = 0; y < height; y++) {
  //   const val = random(255);
  //   for (let i = 0; i < width; i++) {
  //     const index = pixelIndex(i, y);
  //     pg.pixels[index] = pg.pixels[index + 1] = pg.pixels[index + 2] = val;
  //     pg.pixels[index + 3] = 255;
  //   }
  // }
  // for (let i = 0; i < pg.pixels.length; i += 4) {
  //   // const val = random(255);
  //   pg.pixels[i] = random() < 0.5 ? 255 : 0;
  //   pg.pixels[i + 1] = 0;
  //   pg.pixels[i + 2] = 0; //random(255);
  //   pg.pixels[i + 3] = 255;
  // }
  // pg.updatePixels();
}

function pixelIndex(x: number, y: number): number {
  let index = y * 4 * width + x * 4;
  return index;
}

function sortPixels(pixels: Vector[]) {
  pixels.sort((a, b) => {
    return brightness(color(a.x, a.y, a.z)) - brightness(color(b.x, b.y, b.z)); //(b.x + b.y, b.z) / 3 - (a.x + a.y + a.z) / 3;
  });
}

function sortSegment(x: number, y: number, size: number, row: boolean) {
  let segment = [];
  const mainAxis = row ? x : y;
  for (let i = mainAxis; i < mainAxis + size; i++) {
    const index = pixelIndex(row ? i : x, row ? y : i);
    segment.push(new Vector(pg.pixels[index], pg.pixels[index + 1], pg.pixels[index + 2]));
  }
  sortPixels(segment);
  for (let i = 0; i < segment.length; i++) {
    const index = pixelIndex(x + (row ? i : 0), y + (row ? 0 : i));
    pg.pixels[index] = segment[i].x;
    pg.pixels[index + 1] = segment[i].y;
    pg.pixels[index + 2] = segment[i].z;
  }
}

// function downloadFrame() {
//   var link = document.createElement('a');
//   link.download = `frame-${frameCount}.png`;
//   link.href = document.getElementById('defaultCanvas0').toDataURL('image/jpg');
//   link.click();
// }

function draw() {
  if (frameCount >= 60 && frameCount < 810) {
    pg.loadPixels();
    for (let i = 0; i < 50; i++) {
      const x = floor(random(width));
      const y = floor(random(height));
      const row = random() < 0.5;
      let size = min(random(MIN_SEGMENT_SIZE, MAX_SEGMENT_SIZE), row ? width - x : height - y);
      sortSegment(x, y, size, row);
    }
    pg.updatePixels();
  }
  image(pg, 0, 0, width, height);
  // if (SHOULD_RECORD) downloadFrame();
  if (frameCount > RECORD_FRAMES) {
    noLoop();
    console.log('done');
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
