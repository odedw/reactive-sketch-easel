import ProcessingSketch from '../ProcessingSketch';
import { Matrix } from '../../utils/Matrix';
import PoissonDiskSampling from 'poisson-disk-sampling';
import { Color, Graphics, Image } from 'p5';
let matrix: Matrix<number>;

export default class Template extends ProcessingSketch {
  leftX: number;
  rightX: number;
  topY: number;
  bottomY: number;
  cols: number;
  rows: number;
  resolution: number;
  STEP_LENGTH: number;
  NUM_STEPS: number;
  i = 0;
  j = 0;
  img: Image;
  colorMatrix: Matrix<Color>;
  index: number;
  points: any;
  pcg: Graphics;
  preload() {
    this.img = this.p.loadImage('/assets/pd19-20031_1.jpg');
  }
  setup() {
    const p = this.p;
    // document.getElementById('#container').style.background = 'black';

    // canvas
    const w = 800;
    const h = (w * this.img.height) / this.img.width;
    const cnv = p.createCanvas(w, h);
    let canvasX = p.windowWidth / 2 - w / 2;
    let canvasY = p.windowHeight / 2 - h / 2;
    cnv.position(canvasX, canvasY);

    p.frameRate(60);
    p.rectMode(p.CENTER);

    this.pcg = p.createGraphics(w, h);
    this.pcg.image(this.img, 0, 0, this.pcg.width, this.pcg.height);

    p.image(this.pcg, 0, 0);
    // p.noiseDetail(p.random(2, 10), p.random(0, 0.75));
    // this.colorMatrix = new Matrix(this.img.width, this.img.height, (row, col) => {
    //   if (col === 0) {
    //     console.log(row);
    //   }
    //   return p.color(this.img.get(col, row));
    // });

    // this.resolution = p.int(p.width * 0.01);
    // this.STEP_LENGTH = p.width * 0.0001;
    // this.NUM_STEPS = 1000;

    // this.leftX = p.int(p.width * -0.25);
    // this.rightX = p.int(p.width * 1.25);
    // this.topY = p.int(p.height * -0.25);
    // this.bottomY = p.int(p.height * 1.25);
    // this.cols = p.int((this.rightX - this.leftX) / this.resolution);
    // this.rows = p.int((this.bottomY - this.topY) / this.resolution);
    // matrix = new Matrix(this.cols, this.rows, (row, col) => p.noise(row * 0.01, col * 0.01) * p.TWO_PI);
    // console.log('===========================');
    // console.log(`p.width ${p.width}`);
    // console.log(`p.height ${p.height}`);
    // console.log(`leftX ${this.leftX}`);
    // console.log(`rightX ${this.rightX}`);
    // console.log(`topY ${this.topY}`);
    // console.log(`bottomY ${this.bottomY}`);
    // console.log(`resolution ${this.resolution}`);
    // console.log(`cols ${this.cols}`);
    // console.log(`rows ${this.rows}`);
    // console.log('===========================');

    // p.background(0);
    // p.image(this.img, 0, 0);
    // let pds = new PoissonDiskSampling({
    //   shape: [p.width, p.height],
    //   minDistance: 5,
    //   maxDistance: 15,
    //   tries: 30,
    // });
    // this.points = pds.fill();
    // this.index = 0;
    // console.log(this.points.length);
    // for (const pt of points) {
    //   i++;
    //   if (i % 1000 === 0) console.log(i);
    //   this.drawCurve(pt[0], pt[1]);
    // }
    // let img = this.p.get();
    // let name = window.location.href.split('/').at(-1).replace('.sketch.ts', '.jpg');
    // this.p.save(img, name);
  }
  drawCurve(x: number, y: number) {
    const p = this.p;
    p.noFill().strokeWeight(10).beginShape();
    for (let i = 0; i < this.NUM_STEPS; i++) {
      p.vertex(x, y);
      const xOffset = x - this.leftX;
      const yOffset = y - this.topY;
      const col = p.int(xOffset / this.resolution);
      const row = p.int(yOffset / this.resolution);

      if (
        col >= matrix.cols ||
        col < 0 ||
        row >= matrix.rows ||
        row < 0 ||
        x < 0 ||
        x >= p.width ||
        y < 0 ||
        y >= p.height
      ) {
        break;
      }
      const angle = matrix.get(row, col);
      const c = this.colorMatrix.get(p.int(y), p.int(x));
      c.setAlpha(100);
      p.stroke(c);
      // p.stroke(
      //   p.map(row, 0, this.rows, 0, 255),
      //   p.map(col, 0, this.cols, 0, 255),
      //   p.map(row, 0, this.rows + this.cols, 0, 255)
      // );

      const xStep = this.STEP_LENGTH * p.cos(angle);
      const yStep = this.STEP_LENGTH * p.sin(angle);
      x += xStep;
      y += yStep;
    }

    p.endShape();
  }
  draw() {
    const p = this.p;
    // const num = 10;
    // for (let i = 0; i < num; i++) {
    //   if (this.index % 1000 === 0) console.log(this.index);
    //   this.drawCurve(this.points[this.index][0], this.points[this.index][1]);
    //   this.index++;
    //   if (this.index >= this.points.length) {
    //     p.noLoop();
    //     break;
    //   }
    // }
  }
}
