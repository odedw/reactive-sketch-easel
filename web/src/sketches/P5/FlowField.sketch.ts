import ProcessingSketch from '../ProcessingSketch';
import { Matrix } from '../../utils/Matrix';
import PoissonDiskSampling from 'poisson-disk-sampling';
import { Color, Graphics, Image } from 'p5';
let matrix: Matrix<number>;

const imageName = 'michele-caliani-iLAAT1E-H_8-unsplash.jpg';
const NUM_VARIANTS = 1;

export default class Template extends ProcessingSketch {
  i = 0;
  j = 0;
  img: Image;
  colorMatrix: Matrix<Color>;
  index: number;
  pcg: Graphics;
  config: {
    resolution: number;
    numSteps: number;
    stepLength: number;
    leftX: number;
    rightX: number;
    topY: number;
    bottomY: number;
    cols: number;
    rows: number;
    // points: [number, number][];
    strokeWeight: number;
    noiseScale: number;
  };
  points: [number, number][];

  preload() {
    this.img = this.p.loadImage(`/assets/${imageName}`);
  }

  createSettings() {
    const p = this.p;
    const options = {
      scale: 0.01, //p.random(0.01, 0.1),
      stepLength: p.random(0.0001, 0.0001),
      numSteps: 1000, //p.floor(p.randomGaussian(1000, 50)),
      minDistance: 5, //p.random(5, 10),
      maxDistance: 10, //p.random(11, 20),
      tries: 30,
    };
    const strokeWeight = 2; //p.floor(p.abs(p.randomGaussian(0, 3)) + 1);
    const noiseScale = 0.045; //p.random(0.04, 0.07);
    const resolution = p.int(p.width * options.scale);
    const stepLength = p.width * options.stepLength;
    const numSteps = options.numSteps;
    const leftX = p.int(p.width * -0.25);
    const rightX = p.int(p.width * 1.25);
    const topY = p.int(p.height * -0.25);
    const bottomY = p.int(p.height * 1.25);
    const cols = p.int((rightX - leftX) / resolution);
    const rows = p.int((bottomY - topY) / resolution);

    return {
      resolution,
      numSteps,
      stepLength,
      leftX,
      rightX,
      topY,
      bottomY,
      cols,
      rows,
      // points,
      strokeWeight,
      noiseScale,
    };
  }
  setup() {
    const p = this.p;

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

    this.colorMatrix = new Matrix(this.pcg.width, this.pcg.height, (row, col) => {
      return p.color(this.pcg.get(col, row));
    });
    // console.log(`===========================finished color matrix`);

    const pds = new PoissonDiskSampling({
      shape: [p.width * 1.5, p.height * 1.5],
      minDistance: 5,
      maxDistance: 15,
      tries: 30,
    });
    this.points = pds.fill().map((pt) => [pt[0] - p.width * 0.25, pt[1] - p.height * 0.25]);

    // for (let i = 0; i < NUM_VARIANTS; i++) {
    //   this.drawVariant(i);
    // }
  }
  drawVariant(variant: number) {
    console.log(`===========================Variant ${variant}`);

    const p = this.p;
    // settings

    this.config = this.createSettings();
    // console.log('===========================');
    console.table(this.config);
    console.log('===========================');

    matrix = new Matrix(
      this.config.cols,
      this.config.rows,
      (row, col) =>
        p.noise(
          row * this.config.noiseScale,
          col * this.config.noiseScale,
          (p.frameCount * this.config.noiseScale) / 5
        ) * p.TWO_PI
    );
    // p.noiseDetail(p.random(2, 10), p.random(0, 0.75));
    p.background(0);
    // p.image(this.pcg, 0, 0);

    this.index = 0;
    // console.log(this.config.points.length);
    this.points.forEach((pt, i) => {
      // if (i % 500 === 0) console.log(`${p.floor((100 * i) / this.config.points.length)}%`);
      this.drawCurve(pt[0], pt[1]);
    });
    // let img = this.p.get();
    // let name = `FlowField-${imageName.split('.')[0]}-variante-${String(variant).padStart(2, '0')}.jpg`;
    // this.p.save(img, name);
  }

  drawCurve(x: number, y: number) {
    const p = this.p;
    p.noFill().strokeWeight(this.config.strokeWeight).beginShape();
    for (let i = 0; i < this.config.numSteps; i++) {
      p.vertex(x, y);
      const xOffset = x - this.config.leftX;
      const yOffset = y - this.config.topY;
      const col = p.int(xOffset / this.config.resolution);
      const row = p.int(yOffset / this.config.resolution);

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
      // c.setAlpha(100);
      p.stroke(c);
      // p.stroke(
      //   p.map(row, 0, this.rows, 0, 255),
      //   p.map(col, 0, this.cols, 0, 255),
      //   p.map(row, 0, this.rows + this.cols, 0, 255)
      // );

      const xStep = this.config.stepLength * p.cos(angle);
      const yStep = this.config.stepLength * p.sin(angle);
      x += xStep;
      y += yStep;
    }

    p.endShape();
  }
  draw() {
    const p = this.p;
    // const num = 10;
    // for (let i = 0; i < num; i++) {
    //   const percentage = p.floor((this.index / this.points.length) * 100);
    //   if (percentage % 5 === 0) console.log(`${percentage}%`);
    //   this.drawCurve(this.points[this.index][0], this.points[this.index][1]);
    //   this.index++;
    //   if (this.index >= this.points.length) {
    //     p.noLoop();
    //     break;
    //   }
    // }
    this.drawVariant(p.frameCount);
  }
}
