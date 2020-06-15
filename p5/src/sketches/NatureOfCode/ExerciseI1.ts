import Sketch from "../Sketch";
import p5 from "p5";

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
export class ExerciseI1 extends Sketch {
  backgroundColor = 255;
  w!: Walker;

  setup() {
    this.p.createCanvas(this.width, this.height);
    this.w = new Walker(this.width / 2, this.height / 2);
  }
  draw() {
    this.w.step(this.p);
    this.w.display(this.p);
  }
}
