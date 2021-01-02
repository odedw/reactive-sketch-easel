import ProcessingSketch from '../ProcessingSketch';
import * as p5 from 'p5';

class Walker {
  current: { x: number; y: number };
  prev: { x: number; y: number };

  constructor(x: number, y: number) {
    this.prev = this.current = { x, y };
  }
  display(p: p5) {
    p.stroke(0).strokeWeight(1);
    p.line(this.prev.x, this.prev.y, this.current.x, this.current.y);
    this.prev = this.current;
  }
  step(p: p5, w: number, h: number) {
    let stepsize: number, r2: number, stepx: number, stepy: number;
    do {
      stepsize = p.random(0, 20);
      r2 = p.random(0, stepsize * stepsize);
      stepx = p.random(-stepsize, stepsize);
      stepy = p.random(-stepsize, stepsize);
    } while (r2 < stepsize);
    this.current = { x: this.prev.x + stepx, y: this.prev.y + stepy };
  }
}
export default class ExerciseI6 extends ProcessingSketch {
  backgroundColor = 255;
  walker!: Walker;

  setup() {
    this.p.createCanvas(this.w, this.h);
    this.walker = new Walker(this.w / 2, this.h / 2);
  }
  draw() {
    this.walker.step(this.p, this.w, this.h);
    this.walker.display(this.p);
  }
}
