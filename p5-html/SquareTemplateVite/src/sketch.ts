/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Modulate } from '../../utils/p5.modulate';

const WIDTH = 540;
const HEIGHT = 540;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(60);
  noStroke();
  fill(255);
}

function draw() {
  background(0);
}

function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
}

//#region add globals
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
//#endregion
