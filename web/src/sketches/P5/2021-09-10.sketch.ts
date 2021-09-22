import p5 from 'p5';
import { Matrix } from '../../utils/Matrix';
import MidiSketch from './MidiSketch';
import '../../utils/extensions';
import { MidiEventEmitter } from '@reactive-sketch-easel/midi';

const SIZE = 14;
const SQ_SIZE = 20;
const FRAME_DELAY = 30;
let subscribed = false;
export default class Template extends MidiSketch {
  values: Matrix<boolean>;
  empty = { i: 0, j: 0 };
  squares: Matrix<Square>;
  overalSize: number;
  delay = FRAME_DELAY;

  createIndexSet() {
    const res: { i: number; j: number }[] = [];
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        res.push({ i, j });
      }
    }
    return res;
  }

  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    p.rectMode(p.CENTER);
    this.values = new Matrix(SIZE, SIZE, () => true);
    this.empty = this.values.randomIndex();
    this.values.set(this.empty.i, this.empty.j, false);
    this.squares = new Matrix(SIZE, SIZE, (i, j) => new Square(p, j * SQ_SIZE * 2, i * SQ_SIZE * 2));
    this.overalSize = SQ_SIZE * SIZE + SQ_SIZE * (SIZE - 1);
    if (!subscribed) {
      subscribed = true;
      MidiEventEmitter.noteOn().subscribe(() => {
        this.calculateMove();
      });
    }
  }
  draw() {
    const p = this.p;
    p.background(0);
    // p.circle(p.width / 2, p.height / 2, 5);

    // calculate move
    if (!this.squares.items().some((s) => s.isMoving())) {
      if (this.delay > 0) {
        this.delay--;
      } else {
        this.delay = FRAME_DELAY;
        this.logState();
        this.calculateMove();
      }
    }

    // step
    this.squares.items().forEach((s) => s.step(p));

    // render
    p.push();
    p.translate(p.width / 2 - this.overalSize / 2 + SQ_SIZE / 2, p.height / 2 - this.overalSize / 2 + SQ_SIZE / 2);
    const is = this.createIndexSet();
    for (let i = 0; i < is.length; i++) {
      const element = is[i];
      if (this.values.get(element.i, element.j)) {
        this.squares.get(element.i, element.j).render(p);
      }
    }
    p.pop();
  }

  calculateMove() {
    console.log(`===========================calculateMove begin`);
    let unmoving = [];
    do {
      const neighborsIndices = this.values.getNeighborIndices(this.empty.i, this.empty.j);
      unmoving = neighborsIndices.filter((index) => !this.squares.get(index.i, index.j).isMoving());
      if (unmoving.length === 0) {
        console.log(`===========================calculateMove end`);
        break;
      }

      const random = unmoving.random();
      //move square
      console.log(`${random.i},${random.j} => ${this.empty.i},${this.empty.j} | ${random.i},${random.j} is empty`);
      let s1 = this.squares.get(random.i, random.j);
      let s2 = this.squares.get(this.empty.i, this.empty.j);
      s1.targetX = s2.x;
      s1.targetY = s2.y;
      s2.x = s2.targetX = s1.x;
      s2.y = s2.targetY = s1.y;

      //swap square
      this.squares.switch(this.empty.i, this.empty.j, random.i, random.j);
      this.values.switch(this.empty.i, this.empty.j, random.i, random.j);
      this.empty = random;
    } while (unmoving.length > 0);
    this.logState();
  }

  logState() {
    console.log(`===========================logState`);
    console.log('    0      1      2      3      4    ');
    for (let i = 0; i < SIZE; i++) {
      let line = `${i} `;
      for (let j = 0; j < SIZE; j++) {
        line +=
          i === this.empty.i && j === this.empty.j
            ? 'empty  '
            : this.squares.get(i, j).isMoving()
            ? 'moving '
            : 'static ';
      }
      console.log(line);
    }
    console.log(`===========================`);
  }
}

// for (let i = 0; i < SIZE; i++) {
// for (let j = 0; i < SIZE; j++) {}
//   }

class Square {
  x: number;
  y: number;
  targetX: number;
  targetY: number;

  constructor(p: p5, x: number, y: number) {
    this.x = this.targetX = x;
    this.y = this.targetY = y;
  }
  step(p: p5) {
    if (this.x < this.targetX) {
      this.x++;
      // this.x++;
    } else if (this.x > this.targetX) {
      this.x--;
      // this.x--;
    }
    if (this.y < this.targetY) {
      this.y++;
      // this.y++;
    } else if (this.y > this.targetY) {
      this.y--;
      // this.y--;
    }
  }
  render(p: p5) {
    const distance = Math.abs(this.targetY - this.y) + Math.abs(this.targetX - this.x);
    const fill = 255 - (200 * distance) / (SQ_SIZE * 2);
    // p.fill(fill).strokeWeight(0).square(this.x, this.y, SQ_SIZE);

    p.fill(fill, fill, 255).strokeWeight(0).(this.x, this.y, SQ_SIZE);
  }

  isMoving() {
    return this.targetY !== this.y || this.targetX !== this.x;
  }
}
