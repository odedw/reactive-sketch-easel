import p5, { Vector } from 'p5';
import ProcessingSketch from '../ProcessingSketch';

const FRAME_SKIP = 1;
const SIZE = 150;
const NUM_OF_LINES = 15;

class Doodle {
  randomizedPoints: {
    from: Vector;
    to: Vector;
  }[][] = [];
  currentIndex = 0;
  pos: p5.Vector;
  constructor(p: p5, pos: Vector) {
    this.pos = pos;
    const points = [];
    for (let i = 0; i < NUM_OF_LINES; i++) {
      points.push({
        // from: p.createVector(p.random(0, SIZE / 4), p.random(0, SIZE / 4)),
        // to: p.createVector(p.random(0, SIZE / 4), p.random(0, SIZE / 4)),
        from: p.createVector(p.random(0, SIZE / 2), p.random(0, SIZE / 2)),
        to: p.createVector(p.random(0, SIZE / 2), p.random(0, SIZE / 2)),
      });
    }
    this.randomizedPoints.push([...points].randomize());
    this.randomizedPoints.push([...points].randomize());
    this.randomizedPoints.push([...points].randomize());
    this.randomizedPoints.push([...points].randomize());
  }
  get(i: number) {
    return this.randomizedPoints[i][this.currentIndex];
  }
  draw(p: p5) {
    if (this.currentIndex >= this.randomizedPoints[0].length) {
      return;
    }
    p.push();
    p.translate(this.pos.x, this.pos.y);
    p.line(this.get(0).from.x, -this.get(0).from.y, this.get(0).to.x, -this.get(0).to.y);
    p.line(-this.get(1).from.x, -this.get(1).from.y, -this.get(1).to.x, -this.get(1).to.y);
    p.line(-this.get(2).from.x, this.get(2).from.y, -this.get(2).to.x, this.get(2).to.y);
    p.line(this.get(3).from.x, this.get(3).from.y, this.get(3).to.x, this.get(3).to.y);
    // p.line(this.get(0).from.x, -(this.get(0).from.y + SIZE / 4), SIZE / 4 + this.get(0).to.x, -this.get(0).to.y);
    // p.line(-this.get(1).from.x, -(this.get(1).from.y + SIZE / 4), -(SIZE / 4 + this.get(1).to.x), -this.get(1).to.y);
    // p.line(-this.get(2).from.x, this.get(2).from.y + SIZE / 4, -(SIZE / 4 + this.get(2).to.x), this.get(2).to.y);
    // p.line(this.get(3).from.x, this.get(3).from.y + SIZE / 4, SIZE / 4 + this.get(3).to.x, this.get(3).to.y);
    this.currentIndex++;
    p.pop();
  }
}

export default class Genuary4 extends ProcessingSketch {
  doodles: Doodle[] = [];
  i = 0;
  j = 0;
  doodleIndex = 0;
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    p.background(200);
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 6; i++) {
        this.doodles.push(new Doodle(p, p.createVector(150 + i * 200, 150 + j * 200)));
      }
    }
  }
  draw() {
    const p = this.p;
    if (p.frameCount % FRAME_SKIP !== 0) {
      return;
    }
    if (this.doodleIndex < this.doodles.length && this.doodles[this.doodleIndex].currentIndex >= NUM_OF_LINES) {
      this.doodleIndex++;
    }
    if (this.doodleIndex >= this.doodles.length) return;
    this.doodles[this.doodleIndex].draw(p);
  }
}
