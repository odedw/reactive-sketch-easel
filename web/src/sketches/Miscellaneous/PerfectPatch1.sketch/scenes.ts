import shapes, { Shape } from './shapes';
import p5 from 'p5';
import { MidiData, Variation, variations } from './data';

export abstract class Scene {
  shape: Shape;
  var: Variation;
  constructor() {
    this.shape = shapes.random();
    this.var = variations.random() as Variation;
  }
  abstract draw(p: p5, step: number, data: MidiData);
}

class Scene1 extends Scene {
  constructor() {
    super();
    this.var.locations = this.var.locations.sort(() => Math.random() - 0.5);
  }
  draw(p: p5, step: number, d: MidiData) {
    p.background(200);
    let locIndex = 0;
    for (let i = 0; i <= step; i++) {
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
  color: number;
  constructor() {
    super();
  }
  draw(p: p5, step: number, data: MidiData) {
    this.color = step % 2 === 0 ? 200 : 0;
    p.background(200 - this.color);
    p.push();
    p.fill(this.color);
    p.translate(p.width / 2, p.height / 2);
    this.shape.draw(p, this.var.size * 1.5);
    p.pop();
  }
}

export class Scene3 extends Scene {
  color: number;
  constructor() {
    super();
  }
  draw(p: p5, step: number, data: MidiData) {
    this.color = step % 2 === 0 ? 200 : 0;
    p.background(200 - this.color);
    p.push();
    p.fill(this.color);
    p.translate(p.width / 2, p.height / 2);
    this.shape.draw(p, this.var.size * 1.5);
    p.pop();
  }
}
