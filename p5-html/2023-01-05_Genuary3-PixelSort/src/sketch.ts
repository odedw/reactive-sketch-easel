/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Graphics, Image, Vector } from 'p5';
import { Modulate } from '../../utils/p5.modulate';

const IMAGE_NAME = 'photo-1567309676325-2b237f42861f.jpg';

const WIDTH = 540;
const HEIGHT = 540;
const SEGMENT_SIZE = 10;

let col = 0;
let img: Image;
let pg: Graphics;
function preload() {
  img = loadImage(IMAGE_NAME) as Image;
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  colorMode(HSB, 255);
  pixelDensity(1);
  frameRate(60);
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
  // pg.updatePixels();
}

function pixelIndex(x: number, y: number): number {
  let index = y * 4 * width + x * 4;
  return index;
}

function sortPixels(pixels: Vector[]) {
  console.log(pixels.length);
  pixels.sort((a, b) => {
    return brightness(color(a.x, a.y, a.z)) - brightness(color(b.x, b.y, b.z)); //(b.x + b.y, b.z) / 3 - (a.x + a.y + a.z) / 3;
  });
}

function processColumn(x: number) {
  let y = 0;
  while (y < height) {
    let pixels = [];
    let size = min(SEGMENT_SIZE, height - y);
    for (let j = y; j < y + size; j++) {
      pixels.push(
        new Vector(pg.pixels[pixelIndex(x, j)], pg.pixels[pixelIndex(x, j)] + 1, pg.pixels[pixelIndex(x, j) + 2])
      );
    }
    sortPixels(pixels);
    for (let i = 0; i < pixels.length; i++) {
      pg.pixels[pixelIndex(x, y + i)] = pixels[i].x;
      pg.pixels[pixelIndex(x, y + i) + 1] = pixels[i].y;
      pg.pixels[pixelIndex(x, y + i) + 2] = pixels[i].z;
    }
    y += size;
  }
}
function draw() {
  // if (frameCount % 10 !== 0) return;
  pg.loadPixels();
  processColumn(col);
  pg.updatePixels();
  image(pg, 0, 0, width, height);
  col++;
  if (col === width) {
    console.log('done');

    noLoop();
  }
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  pg.loadPixels();
  processColumn(mouseX);
  pg.updatePixels();
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
