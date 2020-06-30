import Sketch from '../Sketch';
import p5 from 'p5';

const NUMBER_OF_WALKERS = 500;
class Walker {
  x: any;
  y: any;
  px: any;
  py: any;
  velocityX: any;
  velocityY: any;
  stroke: number = 1;
  p: p5;
  constructor(x, y, p: p5) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.velocityX = p.random(-5, 5);
    this.velocityY = p.random(-5, 5);
    this.p = p;
  }
  isOut() {
    return this.x < 0 || this.x > this.p.width || this.y < 0 || this.y > this.p.height;
  }
  velocity() {
    this.velocityX += this.p.map(this.p.noise(this.x * 0.003, this.y * 0.003, this.p.millis() * 0.001), 0, 1, -10, 10);
    this.velocityY += this.p.map(this.p.noise(this.y * 0.003, this.x * 0.003, this.p.millis() * 0.001), 0, 1, -10, 10);
  }
  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  draw(pg: p5.Graphics) {
    pg.strokeWeight(1).stroke(0, 255).line(this.x, this.y, this.px, this.py);
    this.px = this.x;
    this.py = this.y;
  }
}

export default class RandomWalkers extends Sketch {
  walkers: Walker[] = [];
  mask: p5.Graphics;
  imageGraphics: p5.Graphics;
  image: p5.Image;

  populateWalkers() {
    this.walkers = [];

    for (let i = 0; i < NUMBER_OF_WALKERS; i++) {
      this.walkers.push(new Walker(this.p.random(0, this.p.width), this.p.random(0, this.p.height), this.p));
    }
  }
  preload() {
    this.image = this.p.loadImage('/assets/v2osk-1Z2niiBPg5A-unsplash-min.jpg');
  }
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    this.populateWalkers();
    p.background(200);
    this.mask = p.createGraphics(this.w, this.h);
  }

  draw() {
    const p = this.p;
    this.walkers.forEach((walker) => {
      if (!walker.isOut()) {
        walker.velocity();
        walker.move();
        walker.draw(this.mask);
      }
    });
    this.walkers = this.walkers.filter((w) => !w.isOut());
    for (let i = 0; i < NUMBER_OF_WALKERS - this.walkers.length; i++) {
      this.walkers.push(new Walker(this.p.random(0, this.p.width), this.p.random(0, this.p.height), this.p));
    }
    // if (!this.walkers.find((w) => !w.isOut())) {
    //   this.populateWalkers();
    // }
    const currentImage = p.createImage(this.image.width, this.image.height);
    currentImage.copy(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      0,
      0,
      currentImage.width,
      currentImage.height
    );
    currentImage.mask(this.mask as any);
    p.image(currentImage, 0, 0, p.width, p.height);
  }
}
