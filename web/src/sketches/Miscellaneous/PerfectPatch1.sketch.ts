import Sketch from '../Sketch';

export default class PerfectPatch1 extends Sketch {
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
  }
  draw() {
    const p = this.p;
    p.background(200);
  }
}
