import p5, { Image } from 'p5';
import ProcessingSketch from '../ProcessingSketch';
import { Matrix } from '../../utils/Matrix';

const NUM_OF_THRESHOLD_MATRICES = 30;
// const PALETTE = ['#ff55ff', '#55ffff', '#ffffff'];

// function pad(d) {
//   //   return d < 10 ? '00' + d.toString() : d < 100 ? '0' + d.toString() : d.toString();
//   return d < 10 ? '0' + d.toString() : d.toString();
// }

export default class Template extends ProcessingSketch {
  img: Image;
  gif: Image[] = [];
  brightnessMatrix: Matrix<number>;
  prevMatrix: Matrix<number>;
  thresholdBrightnessMatrices: Matrix<number>[] = [];
  //   ditherImage: Image;
  //   ditherBrightnessMatrix: Matrix<number>;
  preload() {
    // this.img = this.p.loadImage('/assets/nicholas-kwok-VBWWscZtszY-unsplash.jpg');
    // this.ditherImage = this.p.loadImage('/assets/omid-armin-FnZKE3owM1o-unsplash.jpg');
    this.img = this.p.loadImage('/assets/michele-caliani-iLAAT1E-H_8-unsplash.jpg');
    // for (let i = 0; i < NUM_OF_THRESHOLD_MATRICES; i++) {
    //   this.gif.push(this.p.loadImage(`/assets/ezgif-7-5da2218f8f-gif-im/frame_${pad(i)}_delay-0.03s.gif`));
    //   this.gif.push(this.p.loadImage(`/assets/ezgif-7-3afe4a9e2b-gif-jpg/frame_${pad(i)}_delay-0.07s.jpg`));
    //   this.gif.push(this.p.loadImage(`/assets/ezgif-5-c0a2295fdc-gif-jpg/frame_${pad(i)}_delay-0.03s.jpg`));
    // }
    // this.img = this.p.loadImage('/assets/fl11950910765-image-ku2gqvr2.jpg');
  }
  setup() {
    // document.getElementById('container').style.background = 'black';
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    const cnv = p.createCanvas(this.img.width, this.img.height);
    let canvasX = p.windowWidth / 2 - this.img.width / 2;
    let canvasY = p.windowHeight / 2 - this.img.height / 2;
    cnv.position(canvasX, canvasY);
    this.brightnessMatrix = new Matrix(this.img.width, this.img.height, () => 0);
    for (let i = 0; i < NUM_OF_THRESHOLD_MATRICES; i++) {
      this.thresholdBrightnessMatrices.push(new Matrix(this.img.width, this.img.height, () => 0));
    }
    for (let col = 0; col < this.img.width; col++) {
      for (let row = 0; row < this.img.height; row++) {
        let pixel = this.img.get(col, row);
        this.brightnessMatrix.set(col, row, (pixel[0] + pixel[1] + pixel[2]) / 3 / 255);
        for (let i = 0; i < NUM_OF_THRESHOLD_MATRICES; i++) {
          //   pixel = this.gif[i].get(col, row);
          //   this.thresholdBrightnessMatrices[i].set(col, row, (pixel[0] + pixel[1] + pixel[2]) / 3 / 255);
        }
        // console.log(`finished pixel ${col}, ${row}`);
      }
    }
    this.prevMatrix = new Matrix(this.img.width, this.img.height, () => -1);
    // for (let col = 0; col < this.img.width; col++) {
    //   for (let row = 0; row < this.img.height; row++) {
    //     // const pixel = this.img.get(col, row);
    //     // const brightness = (pixel[0] + pixel[1] + pixel[2]) / 3 / 255 + Math.random() - 0.5;
    //     const brightness = this.brightnessMatrix.get(col, row); // (pixel[0] + pixel[1] + pixel[2]) / 3 / 255;
    //     // const color = p.color(pixel);
    //     p.stroke(brightness > this.ditherBrightnessMatrix.get(col, row) ? 'white' : 'black');
    //     // p.stroke(brightness > Math.random() ? 'white' : 'black');
    //     // p.stroke(p.noise(row, col) * 255);
    //     p.point(col, row);
    //   }
    // }
  }
  randomColor(p: p5) {
    return p.color(p.floor(p.random(0, 255)), p.floor(p.random(0, 255)), p.floor(p.random(0, 255)));
  }
  draw() {
    const p = this.p;
    // const threshold = this.thresholdBrightnessMatrices[p.floor(p.frameCount) % NUM_OF_THRESHOLD_MATRICES];
    // const randomColor = p.random(PALETTE);
    for (let col = 0; col < this.img.width; col++) {
      for (let row = 0; row < this.img.height; row++) {
        // perlin
        // let stroke =
        //   this.brightnessMatrix.get(col, row) > p.noise(row * 0.05, col * 0.05, p.frameCount * 0.1) ? 255 : 0;
        let stroke = this.brightnessMatrix.get(col, row) > Math.random() / 2 ? 255 : 0;
        // let stroke = this.brightnessMatrix.get(col, row) > (p.sin(p.frameCount / 50) + 1) / 2 ? 255 : 0;

        // gif
        // let stroke = this.brightnessMatrix.get(col, row) > threshold.get(col, row) ? 255 : 0;

        if (this.prevMatrix.get(col, row) === stroke) continue;
        this.prevMatrix.set(col, row, stroke);
        p.stroke(stroke);
        // p.stroke(stroke === 255 ? randomColor : 0);
        p.point(col, row);
      }
    }
  }
}
