import p5 from 'p5';
import ProcessingSketch from '../ProcessingSketch';

class Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  child: Rect;
  constructor(p, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  spawnChild(p: p5) {
    if (this.child) {
      console.log(`===========================spawnChild`);

      this.child.spawnChild(p);
    } else {
      let newX = 0;
      let newY = 0;
      let newH = this.h;
      let newW = this.w;
      const denomenator = p.int(p.random(2, 6));
      let segments = p.int(p.random(1, denomenator - 1));
      segments = p.max(segments, denomenator - segments);
      console.log(denomenator + ', ' + segments);

      if (this.w > this.h) {
        newW = (segments * this.w) / denomenator;
        const deltaX = (this.w - newW) / 2;
        console.log(deltaX);
        newX = deltaX * (p.random() > 0.5 ? 1 : -1);
      } else {
        newH = (segments * this.h) / denomenator;
        const deltaY = (this.h - newH) / 2;
        newY = deltaY * (p.random() > 0.5 ? 1 : -1);
      }

      this.child = new Rect(p, newX, newY, newW, newH);
    }
  }
  draw(p: p5) {
    p.push();
    // p.stroke(100);
    p.translate(this.x, this.y);
    p.rect(0, 0, this.w, this.h);
    // p.stroke(200);
    this.child?.draw(p);
    p.pop();
  }
  print() {
    console.log('===========================');
    console.log(`${this.x.toFixed(2)},${this.y.toFixed(2)} | ${this.w.toFixed(2)}, ${this.h.toFixed(2)}`);
    if (this.child) {
      this.child.print();
    }
    console.log('===========================');
  }
}

export default class Template extends ProcessingSketch {
  rect: Rect;
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    p.background(0);
    p.stroke('white').strokeWeight(2).fill(0, 0, 0, 0);
    p.rectMode(p.CENTER);
    this.rect = new Rect(p, p.width / 2, p.height / 2, p.width / 2, (p.height * 3) / 4);
    this.rect.print();
  }
  draw() {
    const p = this.p;
    if (p.frameCount % 20 === 0) {
      this.rect.spawnChild(p);
    }
    p.background(0);
    this.rect.draw(p);
  }
}
