import ProcessingSketch from '../ProcessingSketch';
import p5 from 'p5';

class Dot {
  size: number;
  y: number;
  x: number;
  curx: number;
  cury: number;
  distanceFromCenter: number;
  constructor(p: p5, size: number, x: number, y: number) {
    this.size = size;
    this.x = this.curx = x;
    this.y = this.cury = y;
    this.distanceFromCenter = p.dist(x, y, p.width / 2, p.height / 2); //Math.sqrt(Math.pow(Math.abs(x - w / 2), 2) + Math.pow(Math.abs(y - h / 2), 2));
    // console.log(this.distanceFromCenter);
  }

  draw(p: p5) {
    p.ellipse(this.curx, this.cury, this.size, this.size);
    // this.curx = this.x;
    // this.cury = this.y;
  }
  disturb(p: p5) {
    this.curx += (p.random(-1, 1) * this.distanceFromCenter) / 1000;
    this.cury += (p.random(-1, 1) * this.distanceFromCenter) / 1000;
  }
}

const SIZE = 10;
const ROWS = 30;
const COLS = 53;
const dots = [];
function setup(p: p5, w: number, h: number) {
  p.createCanvas(w, h);
  const hgap = (w - SIZE * COLS) / (COLS + 1);
  const vgap = (h - SIZE * ROWS) / (ROWS + 1);
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const x = j * (SIZE + hgap) + hgap;
      const y = i * (SIZE + vgap) + vgap;
      dots.push(new Dot(p, SIZE, x, y));
    }
  }
  // p.frameRate(60);
}
function draw(p: p5) {
  p.background(0);
  p.strokeWeight(0);
  p.fill('#fff');
  //   if (p.frameCount % 1 == 0) dots.forEach((d) => d.disturb(p));
  dots.forEach((d) => d.draw(p));
  // MidiEventEmitter.noteOn().subscribe(() => {
  dots.forEach((d) => d.disturb(p));
  // });
}

export default class Template extends ProcessingSketch {
  setup() {
    // MidiEventEmitter.init();

    const p = this.p;
    setup(p, this.w, this.h);
  }
  draw() {
    const p = this.p;
    draw(p);
  }

  keyPressed() {
    if (this.p.keyCode === 65) {
      dots.forEach((d) => d.disturb(this.p));
    }
  }
}
