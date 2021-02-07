import shapes, { Shape } from './shapes';
import p5 from 'p5';
import { MidiData, Variation, variations, Palette, randomPalette, randomBoolean } from './data';

export abstract class Scene {
  shape: Shape;
  var: Variation;
  step: number;
  palette: Palette;
  constructor() {
    this.shape = shapes.random();
    this.var = variations.random() as Variation;
    this.palette = randomPalette();
  }
  abstract draw(p: p5, MidiData);

  setStep(step: number) {
    this.step = step;
  }
}

export class Scene1 extends Scene {
  constructor() {
    super();
    this.var.locations = this.var.locations.randomize();
  }
  draw(p: p5, d: MidiData) {
    p.background(this.palette.b);
    let locIndex = 0;
    for (let i = 0; i <= this.step; i++) {
      for (let j = 0; j < this.var.take[i]; j++) {
        p.push();
        p.fill(this.palette.f);
        p.translate(p.width * this.var.locations[locIndex].x, p.height * this.var.locations[locIndex].y);
        p.translate(p.random(0, d.bass), p.random(0, d.bass));
        this.shape.draw(p, this.var.size + d.bd);
        p.pop();
        locIndex++;
      }
    }
  }
}

export class Scene2 extends Scene {
  setStep(step: number) {
    super.setStep(step);
    this.palette.switch();
  }
  draw(p: p5, d: MidiData) {
    p.background(this.palette.b);
    p.push();
    p.fill(this.palette.f);
    p.translate(p.width / 2, p.height / 2);
    p.translate(p.random(0, d.bass), p.random(0, d.bass));
    this.shape.draw(p, this.var.size * 1.5 + d.bd);
    p.pop();
  }
}

export class Scene3 extends Scene {
  color: number = 0;

  setStep(step: number) {
    super.setStep(step);
    this.palette = randomPalette();
    if (randomBoolean()) {
      this.shape = shapes.random();
    }
  }

  draw(p: p5, d: MidiData) {
    p.background(this.palette.b);
    p.push();
    p.fill(this.palette.f);
    p.translate(p.width / 2, p.height / 2);
    p.translate(p.random(0, d.bass), p.random(0, d.bass));
    this.shape.draw(p, this.var.size * 1.5 + d.bd);
    p.pop();
  }
}
