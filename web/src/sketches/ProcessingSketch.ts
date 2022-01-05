import p5, { Vector } from 'p5';
import Sketch from './Sketch';

export default abstract class ProcessingSketch extends Sketch {
  container!: HTMLElement;
  p!: p5;
  center!: Vector;
  running = true;
  constructor() {
    super();
    this.sketch = this.sketch.bind(this);
  }
  abstract setup(): void;
  abstract draw(): void;
  keyPressed() {
    if (this.p.keyCode === 32) {
      if (this.running) this.p.noLoop();
      else this.p.loop();
      this.running = !this.running;
    } else if (this.p.keyCode === 83) {
      let img = this.p.get();
      let name = window.location.href.split('/').at(-1).replace('.sketch.ts', '.jpg');
      this.p.save(img, name);
    }
  }

  keyReleased() {}
  preload() {}

  sketch(p: p5): void {
    this.center = p.createVector(this.w / 2, this.h / 2);
    this.p = p;
    // let setupRun = false;
    // let resolve, reject;
    // const preloadPromise = new Promise((rslv, rjct) => {
    //   resolve = rslv;
    //   reject = rjct;
    // });
    p.setup = () => {
      // if (setupRun) return;
      // setupRun = true;
      this.setup.call(this);
    };
    p.draw = this.draw.bind(this);
    // let preloadRun = false;

    p.preload = () => {
      // if (preloadRun) return;
      // preloadRun = true;
      this.preload.call(this);
    };

    p.keyPressed = this.keyPressed.bind(this);
    p.keyReleased = this.keyReleased.bind(this);
  }

  create(): p5 {
    super.create();
    //@ts-ignore
    return new window.p5(this.sketch, this.container);
  }
}
