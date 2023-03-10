import { Vector } from 'p5';
import { makeNoise2D } from 'open-simplex-noise';
import { polarToCartesian } from '../../utils/math';
const noise2D = makeNoise2D(Date.now());

export class Branch {
  pos: Vector;
  dir: Vector = new Vector(0, -1);
  parent: Branch | null;
  children: Branch[] = [];
  orgDir: Vector;
  count: number = 0;
  dead = false;
  flowerSize = 0;
  branchColor: string;
  flowerColor: string;
  sproutFlower: boolean;
  flowerRotation: number;
  constructor(branchColor: string, flowerColor: string, p: Branch | null, pos: Vector, dir: Vector) {
    this.pos = pos.copy();
    this.dir = dir.copy();
    this.orgDir = dir.copy();
    this.branchColor = branchColor;
    this.flowerColor = flowerColor;
    this.parent = p;
    this.sproutFlower = Math.random() < 0.5;
    this.flowerRotation = Math.random() * TWO_PI;
  }

  draw() {
    if (!this.parent) return;

    stroke(this.branchColor);
    noFill();
    const weight = map(noise2D(this.pos.x / 10, this.pos.y / 10), -1, 1, 1, 5);
    strokeWeight(weight);
    line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);

    if (this.children.length == 0 && this.dead && this.sproutFlower) {
      noStroke();
      circle(this.pos.x, this.pos.y, this.flowerSize);

      const petals = 5;
      for (let i = 0; i < petals; i++) {
        const coord = polarToCartesian(this.flowerSize * 0.9, this.flowerRotation + (i * TWO_PI) / petals);
        fill(this.flowerColor);
        circle(this.pos.x + coord.x, this.pos.y + coord.y, this.flowerSize);
      }
      fill('black');
      circle(this.pos.x, this.pos.y, this.flowerSize * 1.1);

      if (this.flowerSize < 6) {
        this.flowerSize++;
      }
    }
  }

  sprout(): Branch {
    this.dir.add(Vector.random2D());
    this.count++;
    this.dir.div(this.count + 1);
    const newPos = Vector.add(this.pos, Vector.mult(this.dir, 5));
    const b = new Branch(this.branchColor, this.flowerColor, this, newPos, this.dir.copy());
    this.dir = this.orgDir.copy();
    this.count = 0;
    this.children.push(b);
    return b;
  }
}
