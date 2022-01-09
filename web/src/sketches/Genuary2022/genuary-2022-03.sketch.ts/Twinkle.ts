import p5, { Vector } from 'p5';

export class Twinkle {
  pos: p5.Vector;
  rate: number;
  max: number;
  min: number;
  size: number;
  constructor(p: p5) {
    this.init(p);
  }

  init(p: p5) {
    this.pos = p.createVector(p.int(p.random(0, p.width)), p.int(p.random(0, p.height)));
    this.rate = p.random(20, 80);
    this.min = 30;
    this.max = 120;
    this.size = p.random(0.2, 1.5);
  }
  update(p: p5) {}

  draw(p: p5) {
    p.fill((p.sin(p.frameCount / this.rate) + 1 / 2) * (this.max - this.min) + this.min);
    p.circle(this.pos.x, this.pos.y, this.size);
  }
}
