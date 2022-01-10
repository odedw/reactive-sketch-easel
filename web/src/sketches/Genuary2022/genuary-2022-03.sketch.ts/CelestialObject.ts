import p5, { Color } from 'p5';

export class CelestialObject {
  distance: number;
  radius: number;
  moons: CelestialObject[] = [];
  fill: p5.Color;
  angle: number;
  speed: number;
  constructor(p: p5, r: number, d: number, f: Color, s: number, m: CelestialObject[] = []) {
    this.distance = d;
    this.radius = r;
    this.fill = f;
    this.moons = m;
    this.angle = p.random(0, 360);
    this.speed = s; //p.random(5, 20);
  }

  update(p: p5) {
    this.moons.forEach((m) => m.update(p));
    this.angle += this.speed / 100;
  }

  draw(p: p5) {
    p.push();
    p.rotate(this.angle);
    p.translate(this.distance, 0);

    p.noStroke();
    p.fill(this.fill);
    p.ellipse(0, 0, this.radius);
    // for (let x = -this.radius; x <= this.radius; x++) {
    //   for (let y = -this.radius; y <= this.radius; y++) {
    //     const d = p.dist(x, y, 0, 0);
    //     if (d >= this.radius) continue;
    //     this.fill.setAlpha(p.noise((x + this.radius) / 50, (y + this.radius) / 50, p.frameCount / 100) * 255);
    //     p.strokeWeight(1).stroke(this.fill).point(x, y, 1);
    //   }
    // }
    this.moons.forEach((m) => m.draw(p));
    p.pop();
  }
}
