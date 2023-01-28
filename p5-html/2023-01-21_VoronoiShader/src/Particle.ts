import { Graphics } from 'p5';

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
  }

  step() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x >= width) this.vx *= -1;
    if (this.y < 0 || this.y >= height) this.vy *= -1;
  }
  draw(pg: Graphics) {
    // resetShader();
    // stroke(p);
    fill(pg.get(this.x, this.y));
    circle(this.x, this.y, 10);
  }
}
