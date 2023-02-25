import { Vector } from 'p5';
import { makeNoise2D } from 'open-simplex-noise';

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
  constructor(p: Branch | null, pos: Vector, dir: Vector) {
    this.pos = pos.copy();
    this.dir = dir.copy();
    this.orgDir = dir.copy();

    this.parent = p;
  }

  draw() {
    if (!this.parent) return;

    stroke('#5a3034');
    noFill();
    const weight = map(noise2D(this.pos.x / 10, this.pos.y / 10), -1, 1, 1, 5);
    strokeWeight(weight);
    line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);

    if (this.children.length == 0 && this.dead) {
      fill('red');
      noStroke();
      circle(this.pos.x, this.pos.y, this.flowerSize);
      if (this.flowerSize < 7) {
        this.flowerSize++;
      }
    }
  }

  sprout(): Branch {
    this.dir.add(Vector.random2D());
    this.count++;
    this.dir.div(this.count + 1);
    const newPos = Vector.add(this.pos, Vector.mult(this.dir, 5));
    const b = new Branch(this, newPos, this.dir.copy());
    this.dir = this.orgDir.copy();
    this.count = 0;
    this.children.push(b);
    return b;
  }
}
