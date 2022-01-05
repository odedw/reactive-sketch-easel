import { Image } from 'p5';
import ProcessingSketch from '../ProcessingSketch';

let count = 0;
let CIRCLES_PER_FRAME = 10;
export default class Template extends ProcessingSketch {
  img: Image;
  preloadPromise: Promise<void>;
  preload() {
    this.img = this.p.loadImage('/assets/pdfma9-pdfamouspainting082001-image_1.jpg');
  }
  async setup() {
    const p = this.p;
    const cnv = p.createCanvas(this.img.width, this.img.height);
    let canvasX = p.windowWidth / 2 - this.img.width / 2;
    let canvasY = p.windowHeight / 2 - this.img.height / 2;
    cnv.position(canvasX, canvasY);
    p.frameRate(60);
    // for (let col = 0; col < this.img.width; col++) {
    //   for (let row = 0; row < this.img.height; row++) {
    //     let c = this.img.get(col, row);
    //     p.stroke(p.color(c));
    //     p.point(col, row);
    //   }
    // }
  }
  draw() {
    const p = this.p;
    if (count === 10000) {
      return;
    }
    for (let i = 0; i < CIRCLES_PER_FRAME; i++) {
      const col = p.floor(p.random(0, this.img.width));
      const row = p.floor(p.random(0, this.img.height));
      let c = this.img.get(col, row);
      p.fill(p.color(c)).strokeWeight(0);
      p.circle(col, row, 10);
      count++;
    }
    // if (count % 1000 === 0) {
    //   console.log(`${count} ${new Date().getTime() - time}`);
    // }

    // p.background(200);
  }
}
