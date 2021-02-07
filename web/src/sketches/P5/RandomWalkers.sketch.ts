import ProcessingSketch from '../ProcessingSketch';
import p5, { Vector } from 'p5';

const variation = parseInt(new URLSearchParams(window.location.search).get('variation')) || 0;

const NUMBER_OF_WALKERS = 500;
const NOISE_SCALAR = [0.003, 0.003, 0.3, 0.003][variation];
let NOISE_Z = [0.001, 0.001, 0.01, 0][variation];
const MAX_VELOCITY = [1, 25, 25, 50][variation];

class Walker {
  pos: Vector;
  prevPos: Vector;
  velocity: Vector;
  stroke: number = 1;
  p: p5;
  constructor(pos: Vector, p: p5) {
    this.pos = this.prevPos = pos.copy();
    this.velocity = p.createVector(p.random(-MAX_VELOCITY, MAX_VELOCITY), p.random(-MAX_VELOCITY, MAX_VELOCITY));

    this.p = p;
  }
  isOut() {
    return this.pos.x < 0 || this.pos.x > this.p.width || this.pos.y < 0 || this.pos.y > this.p.height;
  }

  update() {
    const newVelocity = this.p.createVector(
      this.p.map(
        this.p.noise(this.pos.x * NOISE_SCALAR, this.pos.y * NOISE_SCALAR, this.p.millis() * NOISE_Z),
        0,
        1,
        -MAX_VELOCITY,
        MAX_VELOCITY
      ),
      this.p.map(
        this.p.noise(this.pos.y * NOISE_SCALAR, this.pos.x * NOISE_SCALAR, this.p.millis() * NOISE_Z),
        0,
        1,
        -MAX_VELOCITY,
        MAX_VELOCITY
      )
    );
    if (variation === 0) {
      this.velocity.add(newVelocity);
    } else {
      this.velocity = newVelocity;
    }
    this.pos.add(this.velocity);
  }
  draw(pg: p5.Graphics) {
    pg.strokeWeight(1).stroke(0, 255).line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.prevPos = this.pos.copy();
  }
}

export default class RandomWalkers extends ProcessingSketch {
  walkers: Walker[] = [];
  mask: p5.Graphics;
  imageGraphics: p5.Graphics;
  image: p5.Image;

  addWalker(pos?: Vector) {
    const p = pos || this.p.createVector(this.p.random(0, this.p.width), this.p.random(0, this.p.height));
    this.walkers.push(new Walker(p, this.p));
  }

  preload() {
    this.image = this.p.loadImage(
      `/assets/${
        [
          'alexander-andrews-yOIT88xWkbg',
          'thomas-millot-zndOvUadrTg',
          'erik-jan-leusink-IcW2ooxn4N4',
          'jason-leung-UIZQfEZ1wUc',
        ][variation]
      }-unsplash.jpg`
    );
  }

  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    for (let i = 0; i < NUMBER_OF_WALKERS; i++) {
      this.addWalker();
    }
    p.background(200);
    this.mask = p.createGraphics(this.w, this.h);
  }

  draw() {
    const p = this.p;
    this.walkers.forEach((walker) => {
      walker.update();
      walker.draw(this.mask);
    });

    this.walkers = this.walkers.filter((w) => !w.isOut());
    for (let i = 0; i < NUMBER_OF_WALKERS - this.walkers.length; i++) {
      this.addWalker();
    }
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
