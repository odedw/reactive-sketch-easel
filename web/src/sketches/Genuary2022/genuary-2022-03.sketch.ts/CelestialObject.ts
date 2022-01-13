import p5 from 'p5';

export class CelestialObject {
  distance: number;
  radius: number;
  moons: CelestialObject[] = [];
  angle: number;
  speed: number;
  img: p5.Image;
  onTrigger: (c: CelestialObject) => void;
  hasRings: boolean;
  glow = 0;

  constructor(
    p: p5,
    r: number,
    d: number,
    s: number,
    img: p5.Image,
    onTrigger: (c: CelestialObject) => void,
    m: CelestialObject[] = [],
    hasRings: boolean = false
  ) {
    this.distance = d;
    this.radius = r;
    this.moons = m;
    this.angle = p.random(0, 360);
    this.speed = s; //p.random(5, 20);
    this.img = img;
    this.onTrigger = onTrigger;
    this.hasRings = hasRings;
  }

  update(p: p5) {
    this.moons.forEach((m) => m.update(p));
    const prevAngle = this.angle;
    this.angle = (this.angle + this.speed) % 360;
    if (this.angle > 270 && prevAngle < 270) {
      this.onTrigger(this);
      this.glow = 255;
    }
  }

  draw(p: p5) {
    p.push();
    p.noStroke();
    p.translate(this.distance * p.cos(this.angle), this.distance * p.sin(this.angle));
    if (this.glow > 0) {
      p.fill(this.glow).circle(0, 0, this.radius + 4);
      this.glow -= 3;
    }
    p.texture(this.img);
    p.push();

    p.rotateY(p.frameCount);
    p.sphere(this.radius);
    if (this.hasRings) {
      // p.rotateY(-p.frameCount);
      p.rotateX(90);
      p.noFill().strokeWeight(1);
      let offset = 0;
      p.scale(0.5);
      [
        ['#605448', 2],
        ['#4C453F', 2],
        ['#736152', 2],
        ['#1B1F28', 2],
        ['#D6AE8A', 2],
        ['#7C6452', 2],
        ['#9B7E64', 2],
        ['#C9A47F', 2],
        ['#1B1F28', 2],
        ['#AA9484', 2],
        ['#847364', 2],
        ['#706355', 2],
        ['#000000', 1],
        ['#3C3D41', 1],
      ].forEach((c) => {
        p.stroke(c[0] as string)
          .strokeWeight(c[1] as number)
          .circle(0, 0, this.radius * 4 + offset);
        offset += c[1] as number;
      });
    }
    p.pop();

    this.moons.forEach((m) => m.draw(p));
    p.pop();
  }
}
