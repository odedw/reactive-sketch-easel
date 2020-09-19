import MidiSketch from '../MidiSketch';
import MidiEventEmitter from '../../midi/MidiEventEmitter';
import p5, { Vector } from 'p5';

class Data {
  bd: number = 0;
}

interface Shape {
  draw(p: p5, size: number);
}

class Square implements Shape {
  draw(p: p5, size: number) {
    p.fill(0).square(0, 0, size);
  }
}

class Circle implements Shape {
  draw(p: p5, size: number) {
    p.fill(0).ellipse(0, 0, size);
  }
}

class Triangle implements Shape {
  draw(p: p5, size: number) {
    const altitude = (size * Math.sqrt(3)) / 2;
    p.fill(0).triangle(0, -(altitude * 2) / 3, -size / 2, +altitude / 3, +size / 2, +altitude / 3);
  }
}

class UpsideDownTriangle implements Shape {
  draw(p: p5, size: number) {
    const altitude = (size * Math.sqrt(3)) / 2;
    p.fill(0).triangle(0, (altitude * 2) / 3, -size / 2, -altitude / 3, +size / 2, -altitude / 3);
  }
}

class Diamond implements Shape {
  draw(p: p5, size: number) {
    p.fill(0).quad((-size * 2) / 3, 0, 0, -size / 2, (size * 2) / 3, 0, 0, size / 2);
  }
}

const shapes = [new UpsideDownTriangle(), new Triangle(), new Square(), new Circle(), new Diamond()];

type Variation = {
  locations: Vector[];
  size: number;
  take: number[];
};
const variations: Variation[] = [
  {
    locations: [
      new Vector().set(0.35, 0.25),
      new Vector().set(0.65, 0.75),
      new Vector().set(0.65, 0.25),
      new Vector().set(0.35, 0.75),
    ],
    size: 200,
    take: [1, 1, 1, 1],
  },
  {
    locations: [
      new Vector().set(0.2, 0.25),
      new Vector().set(0.4, 0.25),
      new Vector().set(0.6, 0.25),
      new Vector().set(0.8, 0.25),
      new Vector().set(0.2, 0.75),
      new Vector().set(0.4, 0.75),
      new Vector().set(0.6, 0.75),
      new Vector().set(0.8, 0.75),
    ],
    size: 150,
    take: [2, 2, 2, 2],
  },
  {
    locations: [
      new Vector().set(0.3, 0.2),
      new Vector().set(0.5, 0.2),
      new Vector().set(0.7, 0.2),
      new Vector().set(0.3, 0.5),
      new Vector().set(0.5, 0.5),
      new Vector().set(0.7, 0.5),
      new Vector().set(0.3, 0.8),
      new Vector().set(0.5, 0.8),
      new Vector().set(0.7, 0.8),
    ],
    size: 150,
    take: [2, 2, 2, 3],
  },
];

interface Scene {
  draw(p: p5, step: number, data: Data);
}

class Scene1 implements Scene {
  shape: Shape;
  var: Variation;
  constructor() {
    this.shape = shapes.random();
    this.var = variations.random() as Variation;
    this.var.locations = this.var.locations.sort(() => Math.random() - 0.5);
  }
  draw(p: p5, step: number, d: Data) {
    let locIndex = 0;
    for (let i = 0; i <= step; i++) {
      for (let j = 0; j < this.var.take[i]; j++) {
        p.push();
        p.translate(p.width * this.var.locations[locIndex].x, p.height * this.var.locations[locIndex].y);
        this.shape.draw(p, this.var.size + d.bd);
        p.pop();
        locIndex++;
      }
    }
  }
}

export default class PerfectPatch1 extends MidiSketch {
  step: number;
  scene: Scene;
  d = new Data();
  reset() {
    this.step = -1;
    this.scene = new Scene1();
  }
  setup() {
    const p = this.p;
    p.rectMode(p.CENTER);
    p.createCanvas(this.w, this.h);
    p.strokeWeight(0);
    p.frameRate(60);
    p.strokeJoin(p.BEVEL);
    MidiEventEmitter.noteOn('D4').subscribe(() => {
      this.step++;
    });
    MidiEventEmitter.noteOn('C4').subscribe(() => {
      this.reset();
    });
    this.reset();
    MidiEventEmitter.ccBind<Data>(51, 'bd', this.d, 1);
  }
  draw() {
    const p = this.p;
    p.background(200);
    this.scene.draw(p, this.step, this.d);
  }
}
