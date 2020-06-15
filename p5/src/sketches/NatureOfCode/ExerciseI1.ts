import Sketch from "../Sketch";

export class ExerciseI1 extends Sketch {
  backgroundColor = 0;

  setup() {
    this.p.createCanvas(this.width, this.height);
  }
  draw() {
    this.p.background(this.backgroundColor);
  }
}
