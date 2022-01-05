import ProcessingSketch from '../ProcessingSketch';

export default class Template extends ProcessingSketch {
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
