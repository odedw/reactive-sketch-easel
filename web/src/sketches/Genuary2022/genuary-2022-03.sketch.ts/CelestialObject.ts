import p5, { Color } from 'p5';

export class CelestialObject {
  distance: number;
  radius: number;
  moons: CelestialObject[] = [];
  fill: p5.Color;
  angle: number;
  speed: number;
  img: p5.Image;

  constructor(p: p5, r: number, d: number, f: Color, s: number, m: CelestialObject[] = [], img: p5.Image = null) {
    this.distance = d;
    this.radius = r;
    this.fill = f;
    this.moons = m;
    this.angle = p.random(0, 360);
    this.speed = s; //p.random(5, 20);
    this.img = img;
  }

  update(p: p5) {
    this.moons.forEach((m) => m.update(p));
    const prevAngle = this.angle;
    this.angle = (this.angle + this.speed) % 360;
    if (this.angle > 270 && prevAngle < 270) {
      console.log('pass');
    }
  }

  draw(p: p5) {
    p.push();
    p.noStroke();
    p.translate(this.distance * p.cos(this.angle), this.distance * p.sin(this.angle));
    // p.translate(this.distance * p.cos(0), this.distance * p.sin(0));
    p.texture(this.img);
    p.push();
    p.rotateY(p.frameCount);
    p.sphere(this.radius);
    p.pop();

    this.moons.forEach((m) => m.draw(p));
    p.pop();
  }
}
