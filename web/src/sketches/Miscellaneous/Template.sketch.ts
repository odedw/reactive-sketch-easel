import Sketch from '../Sketch';

export default class Template extends Sketch {
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
