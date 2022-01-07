import ProcessingSketch from '../ProcessingSketch';
import p5, { Image } from 'p5';
import { Matrix } from '../../utils/Matrix';

class Pixel {
  v;
  dest: { x: any; y: any };
  loc: { x: number; y: number };
  initialDistance = 0;
  speed: number;
  constructor(x, y, v, p: p5) {
    this.dest = { x, y };
    this.loc = { x: p.floor(p.random(0, p.width)), y: p.floor(p.random(0, p.height)) };
    this.v = v * 5;
    this.initialDistance = p.sqrt(p.sq(this.dest.x - this.loc.x) + p.sq(this.dest.y - this.loc.y));
    this.speed = p.random(1, 5);
  }
  step(p: p5) {
    // if (this.loc.x === this.dest.x && this.loc.y === this.dest.y && this.v > 1) {
    //   this.v--;
    // }
    if (this.loc.x !== this.dest.x) {
      const s = p.min(p.abs(this.dest.x - this.loc.x), this.speed);
      this.loc.x += this.loc.x < this.dest.x ? s : -s;
    }
    if (this.loc.y !== this.dest.y) {
      const s = p.min(p.abs(this.dest.y - this.loc.y), this.speed);

      this.loc.y += this.loc.y < this.dest.y ? s : -s;
    }
  }
  render(p: p5, v: number) {
    const d = p.sqrt(p.sq(this.dest.x - this.loc.x) + p.sq(this.dest.y - this.loc.y));
    p.stroke(255, 255, 255, 255 - (255 * d) / this.initialDistance);
    p.circle(this.loc.x, this.loc.y, p.max(d / 20, 1));
  }
}
export default class Template extends ProcessingSketch {
  img: Image;
  imgColorMatrix: Matrix<number>;
  prevMatrix: Matrix<number>;
  currentMatrix: Matrix<number>;
  orgImg: p5.Image;
  points = [];
  pixels: Pixel[] = [];
  neighbourValueMatrix: Matrix<number>;
  preload() {
    this.img = this.p.loadImage('/assets/michele-caliani-iLAAT1E-H_8-unsplash.jpg');
    this.orgImg = this.p.loadImage('/assets/michele-caliani-iLAAT1E-H_8-unsplash.jpg');
  }
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    const cnv = p.createCanvas(this.img.width, this.img.height);
    let canvasX = p.windowWidth / 2 - this.img.width / 2;
    let canvasY = p.windowHeight / 2 - this.img.height / 2;
    cnv.position(canvasX, canvasY);
    this.imgColorMatrix = new Matrix(this.img.width, this.img.height, () => 0);
    this.prevMatrix = new Matrix(this.img.width, this.img.height, () => -1);
    this.currentMatrix = new Matrix(this.img.width, this.img.height, () => -1);
    this.neighbourValueMatrix = new Matrix(this.img.width, this.img.height, () => 1);
    this.img.copy(
      this.orgImg,
      0,
      0,
      this.orgImg.width,
      this.orgImg.height,
      0,
      0,
      this.orgImg.width,
      this.orgImg.height
    );
    this.makeDithered(this.img, 1);
    for (let y = 0; y < this.img.height; y++) {
      for (let x = 0; x < this.img.width; x++) {
        const c = this.img.get(x, y)[0] > 0 ? 255 : 0;
        this.imgColorMatrix.set(x, y, c);

        if (c === 255) {
          const neighboursValue = this.imgColorMatrix
            .getNeighborIndices(x, y)
            .map((index) => this.imgColorMatrix.get(index.i, index.j))
            .filter((i) => i === 255).length;
          this.points.push({ x, y, neighboursValue });
          this.pixels.push(new Pixel(x, y, neighboursValue, p));
          this.neighbourValueMatrix.set(x, y, neighboursValue);
        }
      }
      p.background(0);
    }
    this.points = this.points.sort(() => Math.random() - 0.5);
    p.stroke(255);
    p.fill(0, 0, 0, 0);
    p.strokeWeight(1);
    p.angleMode(p.DEGREES);
  }

  draw() {
    const p = this.p;
    p.background(0);
    this.pixels.forEach((px) => px.step(p));
    this.pixels.forEach((px) => px.render(p, this.neighbourValueMatrix.get(p.floor(px.loc.x), p.floor(px.loc.y))));
  }

  imageIndex(img, x, y) {
    return 4 * (x + y * img.width);
  }

  getColorAtindex(img, x, y) {
    let idx = this.imageIndex(img, x, y);
    let pix = img.pixels;
    let red = pix[idx];
    let green = pix[idx + 1];
    let blue = pix[idx + 2];
    let alpha = pix[idx + 3];
    return this.p.color(red, green, blue, alpha);
  }

  setColorAtIndex(img, x, y, clr) {
    let idx = this.imageIndex(img, x, y);

    let pix = img.pixels;
    pix[idx] = this.p.red(clr);
    pix[idx + 1] = this.p.green(clr);
    pix[idx + 2] = this.p.blue(clr);
    pix[idx + 3] = this.p.alpha(clr);
  }

  // Finds the closest step for a given value
  // The step 0 is always included, so the number of steps
  // is actually steps + 1
  closestStep(max, steps, value) {
    return this.p.round((steps * value) / 255) * this.p.floor(255 / steps);
  }

  makeDithered(img, steps) {
    img.loadPixels();

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        let clr = this.getColorAtindex(img, x, y);
        let oldR = this.p.red(clr);
        let oldG = this.p.green(clr);
        let oldB = this.p.blue(clr);
        let newR = this.closestStep(255, steps, oldR);
        let newG = this.closestStep(255, steps, oldG);
        let newB = this.closestStep(255, steps, oldB);

        // let newClr = this.p.color((newR + newG + newB) / 3 / 255 > 0.5 ? 255 : 0);
        let newClr = this.p.color(newR, newG, newB);
        this.setColorAtIndex(img, x, y, newClr);

        let errR = oldR - newR;
        let errG = oldG - newG;
        let errB = oldB - newB;

        this.distributeError(img, x, y, errR, errG, errB);
      }
    }

    img.updatePixels();
  }

  distributeError(img, x, y, errR, errG, errB) {
    this.addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    this.addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    this.addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
    this.addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
  }

  addError(img, factor, x, y, errR, errG, errB) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
    let clr = this.getColorAtindex(img, x, y);
    let r = this.p.red(clr);
    let g = this.p.green(clr);
    let b = this.p.blue(clr);
    clr.setRed(r + errR * factor);
    clr.setGreen(g + errG * factor);
    clr.setBlue(b + errB * factor);

    this.setColorAtIndex(img, x, y, clr);
  }
}
