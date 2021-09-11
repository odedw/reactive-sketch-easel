import ProcessingSketch from '../ProcessingSketch';

const PALETTE = ['#ff55ff', '#55ffff', '#ffffff'];
const COLOR_FRAME_SKIP = 3;
const FRAME_CLEAN_SKIP = COLOR_FRAME_SKIP * 4;
const SIZE = 150;
const WIDTH = 2;
const JITTER = 20;
export default class Template extends ProcessingSketch {
  color = PALETTE[0];
  default_points = [];
  points = [];
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
  }
  draw() {
    const p = this.p;
    if (p.frameCount % COLOR_FRAME_SKIP === 0) {
      this.color = p.random(PALETTE);
      this.points = [
        { x: this.w / 2 - SIZE + p.random(-JITTER, JITTER), y: this.h / 2 - SIZE + p.random(-JITTER, JITTER) },
        { x: this.w / 2 + SIZE + p.random(-JITTER, JITTER), y: this.h / 2 - SIZE + p.random(-JITTER, JITTER) },
        { x: this.w / 2 + SIZE + p.random(-JITTER, JITTER), y: this.h / 2 + SIZE + p.random(-JITTER, JITTER) },
        { x: this.w / 2 - SIZE + p.random(-JITTER, JITTER), y: this.h / 2 + SIZE + p.random(-JITTER, JITTER) },
      ];
    }
    if (p.frameCount % FRAME_CLEAN_SKIP === 0) {
      p.background(0);
    }
    p.fill(0).stroke(this.color).strokeWeight(WIDTH);

    this.points.forEach((point, i) => {
      const next = this.points[(i + 1) % this.points.length];
      p.line(point.x, point.y, next.x, next.y);
    });
    // p.line(
    //   this.w / 2 - SIZE + p.random(-JITTER, JITTER),
    //   this.h / 2 - SIZE + p.random(-JITTER, JITTER),
    //   this.w / 2 + SIZE + p.random(-JITTER, JITTER),
    //   this.h / 2 - SIZE + p.random(-JITTER, JITTER)
    // );

    // .rect(
    //   this.w / 2 - SIZE / 2 + p.random(-JITTER / 2, JITTER / 2),
    //   this.h / 2 - SIZE / 2 + p.random(-JITTER / 2, JITTER / 2)
    // );
  }
}

// function run(w: number, h: number, canvas: HTMLElement) {
//     let sketch = function (p: p5) {
//       p.setup = function () {
//         p.createCanvas(w, h);
//       };

//       p.draw = function () {};
//     };

//     new p5(sketch, canvas);
//   }
