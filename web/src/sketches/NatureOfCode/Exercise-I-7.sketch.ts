import Sketch from "../Sketch";
import * as p5 from "p5";

class Walker {
  current: { x: number; y: number };
  prev: { x: number; y: number };
  offx: number;
  offy: number;

  constructor(x: number, y: number, p: p5) {
    this.prev = this.current = { x, y };
    this.offx = p.random(0, 100);
    this.offy = p.random(1000, 100);
  }
  display(p: p5) {
    p.stroke(0).strokeWeight(1);
    p.line(this.prev.x, this.prev.y, this.current.x, this.current.y);
    this.prev = this.current;
  }
  step(p: p5, w: number, h: number) {
    const maxStepSize = 5;
    const offsetSize = 0.1;
    do {
      const stepx = p.map(p.noise(this.offx), 0, 1, -maxStepSize, maxStepSize);
      const stepy = p.map(p.noise(this.offy), 0, 1, -maxStepSize, maxStepSize);
      this.current = { x: this.prev.x + stepx, y: this.prev.y + stepy };
      this.offx += offsetSize;
      this.offy += offsetSize;
    } while (
      this.current.x <= 0 ||
      this.current.x > w ||
      this.current.y < 0 ||
      this.current.y > h
    );
  }
}
export default class ExerciseI7 extends Sketch {
  backgroundColor = 255;
  walker!: Walker;

  setup() {
    this.p.createCanvas(this.w, this.h);
    this.walker = new Walker(this.w / 2, this.h / 2, this.p);
  }
  draw() {
    this.walker.step(this.p, this.w, this.h);
    this.walker.display(this.p);
  }
}
