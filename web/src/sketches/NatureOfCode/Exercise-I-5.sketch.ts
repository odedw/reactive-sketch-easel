import ProcessingSketch from '../ProcessingSketch';
import * as p5 from 'p5';

const STANDARD_DEVIATION = 20;
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
    do {
      const stepx = p.int(p.randomGaussian(0, STANDARD_DEVIATION));
      const stepy = p.int(p.randomGaussian(0, STANDARD_DEVIATION));

      this.current = { x: this.prev.x + stepx, y: this.prev.y + stepy };
    } while (this.current.x <= 0 || this.current.x > w || this.current.y < 0 || this.current.y > h);
  }
}
export default class ExerciseI5 extends ProcessingSketch {
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
