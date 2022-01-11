import { Image } from 'p5';
import ProcessingSketch from '../ProcessingSketch';

export default class Template extends ProcessingSketch {
  img: Image;
  preload() {
    this.img = this.p.loadImage('/assets/jupitermap.jpg');
  }
  setup() {
    const p = this.p;
    let canvas = p.createCanvas(this.w, this.h, p.WEBGL);
    p.frameRate(60);
    p.noStroke();
    canvas.elt.oncontextmenu = () => false;
  }
  draw() {
    const p = this.p;
    p.background(0, 0, 0, 0);
    p.rotateY(p.frameCount / 500);
    p.texture(this.img);
    p.sphere(100);
  }
}
