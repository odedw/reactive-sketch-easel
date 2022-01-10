import ProcessingSketch from '../ProcessingSketch';

export default class Template extends ProcessingSketch {
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    p.stroke('white').strokeWeight(4);
    p.rectMode(p.CENTER);
  }
  draw() {
    const p = this.p;
    p.background(0);
  }
}
