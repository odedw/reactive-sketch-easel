import ProcessingSketch from '../ProcessingSketch';

const SIZE = 300;
const SPEED = 0.01;
export default class LFO extends ProcessingSketch {
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
  }
  draw() {
    const p = this.p;
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.ellipse(0, 0, Math.sin(p.frameCount * SPEED) * SIZE);
  }
}
