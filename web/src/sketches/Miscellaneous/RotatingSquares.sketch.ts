import Sketch from "../Sketch";

const SQUARE_SIZE = 50;
const ANGLE_SIZE = 0.001;
const MAX_ANGLE = 90;
const LAG_FACTOR = 100;
export default class RotatingSquares extends Sketch {
  isTurning = false;
  currentAngle = 0;
  stroke = 0;
  setup() {
    const p = this.p;
    p.createCanvas(this.h, this.h);
    p.rectMode(p.CENTER);
    p.angleMode(p.DEGREES);
    p.background(200);
  }
  draw() {
    const p = this.p;
    // p.background(200);
    let min: number | undefined = undefined;
    if (this.isTurning) {
      this.currentAngle += ANGLE_SIZE;
    }
    for (let x = 0; x < this.w; x += SQUARE_SIZE) {
      for (let y = 0; y < this.h; y += SQUARE_SIZE) {
        p.push();
        p.translate(x, y);
        p.push();
        if (this.isTurning) {
          this.currentAngle += ANGLE_SIZE;
          const lag = p.createVector(x, y).mag();
          const angle = p.min(
            MAX_ANGLE,
            p.max(0, this.currentAngle - lag * ANGLE_SIZE * LAG_FACTOR)
          );
          p.rotate(angle);
          min = min ? p.min(min, angle) : angle;
        }
        p.fill(0, 0, 0, 0)
          .stroke(this.stroke)
          .strokeWeight(2)
          .square(0, 0, SQUARE_SIZE);
        p.pop();
        p.fill(0, 0, 0, 0).stroke(0).strokeWeight(2).square(0, 0, SQUARE_SIZE);
        p.pop();
      }
    }
    if (min! >= MAX_ANGLE) {
      // this.isTurning = false;
      this.currentAngle = 0;
      this.stroke = this.stroke === 200 ? 0 : 200;
    }
  }

  keyPressed() {
    if (this.p.keyCode === 32) {
      this.isTurning = true;
    }
  }
}
