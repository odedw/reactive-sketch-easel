import p5, { Color } from 'p5';
import { Output } from '@reactive-sketch-easel/midi';

export class CelestialObject {
  distance: number;
  radius: number;
  moons: CelestialObject[] = [];
  angle: number;
  speed: number;
  img: p5.Image;
  onTrigger: (c: CelestialObject) => void;

  constructor(
    p: p5,
    r: number,
    d: number,
    s: number,
    img: p5.Image,
    onTrigger: (c: CelestialObject) => void,
    m: CelestialObject[] = [],
  ) {
    this.distance = d;
    this.radius = r;
    this.moons = m;
    this.angle = p.random(0, 360);
    this.speed = s; //p.random(5, 20);
    this.img = img;
    this.onTrigger = onTrigger;
  }

  update(p: p5) {
    this.moons.forEach((m) => m.update(p));
    const prevAngle = this.angle;
    this.angle = (this.angle + this.speed) % 360;
    if (this.angle > 270 && prevAngle < 270) {
      this.onTrigger(this);
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
