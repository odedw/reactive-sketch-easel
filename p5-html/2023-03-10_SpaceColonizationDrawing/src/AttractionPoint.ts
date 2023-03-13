import { Vector } from 'p5';

export class AttractionPoint {
  pos: Vector;
  reached = false;
  sproutFlower: boolean;
  constructor(pos: Vector, sproutFlower: boolean) {
    this.pos = pos;
    this.sproutFlower = sproutFlower;
  }

  draw() {
    fill(0);
    noStroke();
    circle(this.pos.x, this.pos.y, 4);
  }
}
