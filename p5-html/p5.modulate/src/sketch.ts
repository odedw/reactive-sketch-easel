/// <reference path="../node_modules/@types/p5/global.d.ts" />



import { Modulate } from './modulate';

const lfo = Modulate.createLfo(
  Modulate.SINE, // type
  120, // frequency in frames
  100, // from
  400 // to
);

function setup() {
  createCanvas(540, 540);
  frameRate(60);
  noStroke();
  fill(255);
}

function draw() {
  circle(frameCount, lfo.get(), 4);
}




//#region add globals
window.setup = setup;
window.draw = draw;
// window.mouseClicked = mouseClicked;
//#endregion
