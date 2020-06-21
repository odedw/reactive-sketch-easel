import p5 from "p5";

export default abstract class Sketch {
  container!: HTMLElement;
  w!: number;
  h!: number;
  p!: p5;
  center!: { x: number; y: number };
  constructor() {
    this.sketch = this.sketch.bind(this);
  }

  abstract setup(): void;
  abstract draw(): void;

  sketch(p: p5): void {
    let running = true;
    this.p = p;
    p.setup = this.setup.bind(this);
    p.draw = this.draw.bind(this);
    p.keyPressed = () => {
      if (this.p.keyCode === 32) {
        if (running) this.p.noLoop();
        else this.p.loop();
        running = !running;
      }
    };
  }

  create(): p5 {
    this.container = document.getElementById("container")!;
    this.w = this.container.clientWidth;
    this.h = this.container.clientHeight;
    this.center = { x: this.w / 2, y: this.h / 2 };
    return new p5(this.sketch, this.container);
  }
}
