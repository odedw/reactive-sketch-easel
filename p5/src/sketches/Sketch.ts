import p5, { Vector } from "p5";

export default abstract class Sketch {
  container!: HTMLElement;
  w!: number;
  h!: number;
  p!: p5;
  center!: Vector;
  running = true;
  constructor() {
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

  create(): p5 {
    this.container = document.getElementById("container")!;
    this.w = this.container.clientWidth;
    this.h = this.container.clientHeight;
    //@ts-ignore
    return new window.p5(this.sketch, this.container);
  }
}
