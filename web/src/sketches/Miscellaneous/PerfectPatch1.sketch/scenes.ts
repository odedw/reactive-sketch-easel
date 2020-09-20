import shapes, { Shape } from './shapes';
import p5 from 'p5';
import { MidiData, Variation, variations } from './data';

const randomBoolean = () => Math.random() > 0.5;

export abstract class Scene {
  shape: Shape;
  var: Variation;
  step: number;
  constructor() {
    this.shape = shapes.random();
    this.var = variations.random() as Variation;
  }
  abstract draw(p: p5, MidiData);

  setStep(step: number) {
    this.step = step;
  }
}

class Scene1 extends Scene {
  constructor() {
    super();
    this.var.locations = this.var.locations.sort(() => Math.random() - 0.5);
  }
  draw(p: p5, d: MidiData) {
    p.background(200);
    let locIndex = 0;
    for (let i = 0; i <= this.step; i++) {
      for (let j = 0; j < this.var.take[i]; j++) {
        p.push();
        p.fill(0);
        p.translate(p.width * this.var.locations[locIndex].x, p.height * this.var.locations[locIndex].y);
        this.shape.draw(p, this.var.size + d.bd);
        p.pop();
        locIndex++;
      }
    }
  }
}

export class Scene2 extends Scene {
  constructor() {
    super();
  }
  draw(p: p5, data: MidiData) {
    const color = this.step % 2 === 0 ? 200 : 0;
    p.background(200 - color);
    p.push();
    p.fill(color);
    p.translate(p.width / 2, p.height / 2);
    this.shape.draw(p, this.var.size * 1.5);
    p.pop();
  }
}

export class Scene3 extends Scene {
  color: number = 0;
  constructor() {
    super();
  }

  setStep(step: number) {
    super.setStep(step);
    this.color = 200 - this.color;
    if (randomBoolean()) {
      this.shape = shapes.random();
    }
  }

  draw(p: p5, data: MidiData) {
    p.background(200 - this.color);
    p.push();
    p.fill(this.color);
    p.translate(p.width / 2, p.height / 2);
    this.shape.draw(p, this.var.size * 1.5);
    p.pop();
  }
}
