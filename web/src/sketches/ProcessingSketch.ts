import p5, { Vector } from 'p5';
import Sketch from './Sketch';

export default abstract class ProcessingSketch extends Sketch {
  container!: HTMLElement;
  w!: number;
  h!: number;
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
    }
  }
  preload() {}

  sketch(p: p5): void {
    this.center = p.createVector(this.w / 2, this.h / 2);

    this.p = p;
    p.setup = this.setup.bind(this);
    p.draw = this.draw.bind(this);
    p.preload = this.preload.bind(this);
    p.keyPressed = this.keyPressed.bind(this);
  }

  create(w?: number, h?: number): p5 {
    this.container = document.getElementById('container')!;
    this.w = w || this.container.clientWidth;
    this.h = h || this.container.clientHeight;
    //@ts-ignore
    return new window.p5(this.sketch, this.container);
  }
}
