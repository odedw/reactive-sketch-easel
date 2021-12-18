import p5 from 'p5';
import { Matrix } from '../../utils/Matrix';
import MidiSketch from './MidiSketch';
import '../../utils/extensions';
import { MidiEventEmitter } from '@reactive-sketch-easel/midi';
enum Mode {
  Vanila = 2,
  NoErase,
  // Colors,
  // ColorsShake,
  ColorsNoErase,
  ColorsNoEraseShake,
  Shear,
  Mess,
  MessBlinkingNoErase,
}

const shouldErase: Record<Mode, boolean> = {
  2: true,
  3: false,
  // 2: true,
  // 3: true,
  4: false,
  5: false,
  6: false,
  7: true,
  8: false,
};
const shouldUseColors: Record<Mode, boolean> = {
  2: false,
  3: false,
  // 2: true,
  // 3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
};
const shouldShake: Record<Mode, boolean> = {
  2: false,
  3: false,
  // 2: false,
  // 3: true,
  4: false,
  5: true,
  6: false,
  7: false,
  8: false,
};
const shouldClearOnChange: Record<Mode, boolean> = {
  2: true,
  3: true,
  // 2: true,
  // 3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: false,
};

const movesPerMode: Record<Mode, number> = {
  2: 8, // //8,
  3: 16, // //16,
  // 2: 8, // //8,
  // 3: 8, // //8,
  4: 16, // //16,
  5: 16, // //16,
  6: 16, //
  7: 8, //,
  8: 160, //0,
};

const randomColor = (p) => ({
  r: p.random(50, 255),
  g: p.random(50, 255),
  b: p.random(50, 255),
});
let mode: Mode = Mode.Vanila;
const SIZE = 22;
const SQ_SIZE = 12;
const FRAME_DELAY = 20;
let subscribed = false;
let elapsed = 0;
export default class Template extends MidiSketch {
  values: Matrix<boolean>;
  empty = { i: 0, j: 0 };
  squares: Matrix<Square>;
  overalSize: number;
  delay = FRAME_DELAY;
  moves = -1;
  justSwitchedMode = true;

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
    this.squares = new Matrix(
      SIZE,
      SIZE,
      (i, j) => new Square(j * SQ_SIZE * 2, i * SQ_SIZE * 2, randomColor(p), p.random(0.8, 1.2))
    );
    this.overalSize = SQ_SIZE * SIZE + SQ_SIZE * (SIZE - 1);
    if (!subscribed) {
      subscribed = true;
      // MidiEventEmitter.noteOn().subscribe((e) => {
      //   this.beat();
      // });
    }
    p.background(0);
  }
  beat() {
    const p = this.p;
    this.calculateMove(p);
    this.moves++;
    if (this.moves === movesPerMode[mode]) {
      mode++;
      this.moves = 0;
      this.justSwitchedMode = true;
    }
  }
  draw() {
    const p = this.p;
    if ((this.justSwitchedMode && shouldClearOnChange[mode]) || shouldErase[mode]) {
      p.background(0);
      this.justSwitchedMode = false;
    }
    elapsed += p.deltaTime;
    if (elapsed > 600) {
      elapsed = 0;
      this.beat();
    }
    // p.circle(p.width / 2, p.height / 2, 5);

    // calculate move
    // if (!this.squares.items().some((s) => s.isMoving())) {
    //   if (this.delay > 0) {
    //     this.delay--;
    //   } else {
    //     this.delay = FRAME_DELAY;
    //     this.logState();
    //     this.calculateMove(p);
    //     if (++this.moves % 8 === 0) {
    //       mode++;
    //     }
    //   }
    // }

    // step
    this.squares.items().forEach((s) => s.step(p));

    // render
    p.push();
    p.translate(p.width / 2 - this.overalSize / 2 + SQ_SIZE / 2, p.height / 2 - this.overalSize / 2 + SQ_SIZE / 2);
    const is = this.createIndexSet();
    for (let i = 0; i < is.length; i++) {
      const element = is[i];
      if (this.values.get(element.i, element.j)) {
        this.squares.get(element.i, element.j).render(p, element.i, element.j);
      }
    }
    p.pop();
  }

  calculateMove(p: p5) {
    let iterations = 0;
    do {
      let unmoving = [];
      let backupValues = this.values.clone();
      let backupSquares = this.squares.clone();
      let backupEmpty = { ...this.empty };
      iterations = 0;
      do {
        const neighborsIndices = this.values.getNeighborIndices(this.empty.i, this.empty.j);
        unmoving = neighborsIndices.filter((index) => !this.squares.get(index.i, index.j).isMoving());
        if (unmoving.length === 0) {
          break;
        }

        const random = p.random(unmoving);
        //move square
        let s1 = this.squares.get(random.i, random.j);
        let s2 = this.squares.get(this.empty.i, this.empty.j);
        s1.targetX = s2.x + (mode === Mode.Mess || mode === Mode.MessBlinkingNoErase ? p.random(-10, 10) : 0);
        s1.targetY = s2.y + (mode === Mode.Mess || mode === Mode.MessBlinkingNoErase ? p.random(-10, 10) : 0);
        s2.x = s2.targetX = s1.x + (mode === Mode.Mess || mode === Mode.MessBlinkingNoErase ? p.random(-10, 10) : 0);
        s2.y = s2.targetY = s1.y + (mode === Mode.Mess || mode === Mode.MessBlinkingNoErase ? p.random(-10, 10) : 0);

        //swap square
        this.squares.switch(this.empty.i, this.empty.j, random.i, random.j);
        this.values.switch(this.empty.i, this.empty.j, random.i, random.j);
        this.empty = random;

        iterations++;
      } while (unmoving.length > 0);
      if (iterations < 50) {
        this.values = backupValues;
        this.squares = backupSquares;
        this.empty = backupEmpty;
      }
    } while (iterations < 50);

    console.log(iterations);
  }
}

class Square {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: {
    r: number;
    g: number;
    b: number;
  };
  scale: number;

  constructor(x: number, y: number, color, scale) {
    this.x = this.targetX = x;
    this.y = this.targetY = y;
    this.color = color;
    this.scale = scale;
  }
  step(p: p5) {
    if (this.x < this.targetX) {
      this.x++;
    } else if (this.x > this.targetX) {
      this.x--;
    }
    if (this.y < this.targetY) {
      this.y++;
    } else if (this.y > this.targetY) {
      this.y--;
    }
  }
  render(p: p5, i: number, j: number) {
    p.push();
    let translate = mode > Mode.ColorsShake ? 3 : 1;
    if (shouldShake[mode]) {
      p.translate(p.random(-translate, translate), p.random(-translate, translate));
    }
    if (mode === Mode.Shear) {
      p.shearX(p.sin(p.frameCount / 100) / 10);
      p.shearY(p.cos(p.frameCount / 100) / 10);
    }
    if (mode === Mode.MessBlinkingNoErase) {
      if (this.isMoving() && p.frameCount % 5 === 0) {
        this.color = randomColor(p);
      }
    }

    const distance = Math.abs(this.targetY - this.y) + Math.abs(this.targetX - this.x);
    const fillDiff = mode === Mode.NoErase ? (200 * distance) / (SQ_SIZE * 2) : 0;
    const color = shouldUseColors[mode] ? this.color : { r: 255, g: 255, b: 255 };
    p.fill(color.r - fillDiff, color.g - fillDiff, color.b - fillDiff);
    p.strokeWeight(0).circle(this.x, this.y, SQ_SIZE);
    p.pop();
  }

  isMoving() {
    return this.targetY !== this.y || this.targetX !== this.x;
  }

  clone(): Square {
    return new Square(this.x, this.y, this.color, this.scale);
  }
}
