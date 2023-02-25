import { Vector } from 'p5';

export class AttractionPoint {
  pos: Vector;
  reached = false;
  constructor(pos: Vector) {
    this.pos = pos;
  }

  draw() {
    fill(0);
    noStroke();
    circle(this.pos.x, this.pos.y, 4);
  }
}
