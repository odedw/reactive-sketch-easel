import p5, { Color } from 'p5';

export class CelestialObject {
  distance: number;
  radius: number;
  moons: CelestialObject[] = [];
  fill: p5.Color;
  constructor(p: p5, r: number, d: number, f: Color = undefined) {
    this.distance = d;
    this.radius = r;
    this.fill = f || p.color(255);
  }

  update(p: p5) {}

  draw(p: p5) {
    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.noStroke();
    p.fill(this.fill);
    p.ellipse(0, 0, this.radius * 2);
  }
}
