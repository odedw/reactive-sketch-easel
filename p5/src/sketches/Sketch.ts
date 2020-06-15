import p5 from "p5";

export default abstract class Sketch {
  container!: HTMLElement;
  width!: number;
  height!: number;
  p!: p5;
  constructor() {
    this.sketch = this.sketch.bind(this);
  }

  abstract setup(): void;
  abstract draw(): void;

  sketch(p: p5): void {
    this.p = p;
    p.setup = this.setup.bind(this);
    p.draw = this.draw.bind(this);
  }

  create(): p5 {
    this.container = document.getElementById("container")!;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    return new p5(this.sketch, this.container);
  }
}
