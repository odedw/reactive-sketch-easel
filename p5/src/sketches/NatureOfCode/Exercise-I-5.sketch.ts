import Sketch from "../Sketch";
import * as p5 from "p5";

class Walker {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  display(p: p5) {
    p.stroke(0);
    p.point(this.x, this.y);
  }
  step(p: p5) {
    const stepx = p.min(p.round(p.random(-1, 1.5)), 1);
    const stepy = p.min(p.round(p.random(-1, 1.5)), 1);

    this.x += stepx;
    this.y += stepy;
  }
}
export default class ExerciseI5 extends Sketch {
  backgroundColor = 255;
  walker!: Walker;

  setup() {
    this.p.createCanvas(this.w, this.h);
    this.walker = new Walker(this.w / 2, this.h / 2);
  }
  draw() {
    this.walker.step(this.p);
    this.walker.display(this.p);
  }
}
