import Sketch from "../Sketch";
import "p5/lib/addons/p5.sound";
import { Color, SoundFile } from "p5";
type Circle = {
  x: number;
  y: number;
  size: number;
  color: Color;
};
const CIRCLE_SIZE = 40;
const MIN_TIME_BETWEEN_CIRCLES = 50;
let timeToNextCircle = 1000;

let elapsed = timeToNextCircle;
let lastFrameTime = 0;
let ratio = 0.9;
let levelRatio = 0.95;
let sd: number;
let file: SoundFile;
let currentLevel = 1;

const circles: Circle[] = [];
export default class ExerciseI4 extends Sketch {
  preload() {
    file = this.p.loadSound(require("./assets/tom.wav"));
  }
  setup() {
    const p = this.p;
    sd = p.min(this.w, this.h) / 10;
    p.createCanvas(this.w, this.h);
    p.background(240);
  }
  draw() {
    const p = this.p;
    const currentFrameTime = performance.now();
    elapsed -= currentFrameTime - lastFrameTime;
    if (elapsed <= 0) {
      file.play(0, p.random(0.5, 1.5), currentLevel, 0, file.duration());
      if (timeToNextCircle > MIN_TIME_BETWEEN_CIRCLES) {
        timeToNextCircle *= ratio;
        currentLevel *= levelRatio;
      }
      elapsed = timeToNextCircle;
      circles.push({
        x: p.randomGaussian(this.center.x, sd),
        y: p.randomGaussian(this.center.y, sd),
        color: p.color(p.random(255), p.random(255), p.random(255), 50),
        size: 1,
      });
    }
    circles.forEach((c) => {
      if (c.size < CIRCLE_SIZE) c.size += 10;
      p.fill(c.color).strokeWeight(0).ellipse(c.x, c.y, c.size);
    });
    lastFrameTime = currentFrameTime;
  }
}
