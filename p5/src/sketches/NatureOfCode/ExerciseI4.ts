import Sketch from "../Sketch";
import { Color } from "p5";
type Circle = {
  x: number;
  y: number;
  size: number;
  color: Color;
};
const CIRCLE_SIZE = 30;
let timeToNextCircle = 1000;
let elapsed = timeToNextCircle;
let lastFrameTime = 0;
let ratio = 0.9;
let sd: number;
const circles: Circle[] = [];
export class ExerciseI4 extends Sketch {
  setup() {
    const p = this.p;
    sd = p.min(this.w, this.h) / 8;
    p.createCanvas(this.w, this.h);
    p.background(240);
  }
  draw() {
    const p = this.p;
    const currentFrameTime = performance.now();
    elapsed -= currentFrameTime - lastFrameTime;
    if (elapsed <= 0) {
      if (timeToNextCircle > 1) timeToNextCircle *= ratio;
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
