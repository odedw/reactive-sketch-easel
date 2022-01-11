import p5, { Color } from 'p5';

export class CelestialObject {
  distance: number;
  radius: number;
  moons: CelestialObject[] = [];
  fill: p5.Color;
  angle: number;
  speed: number;
  pg: p5.Graphics;
  constructor(p: p5, r: number, d: number, f: Color, s: number, m: CelestialObject[] = []) {
    this.distance = d;
    this.radius = r;
    this.fill = f;
    this.moons = m;
    this.angle = p.random(0, 360);
    this.speed = s; //p.random(5, 20);
    this.pg = p.createGraphics(2 * r, 2 * r);
    // this.pg.rectMode(p.CENTER);
    this.pg.noStroke();
    this.pg.fill(this.fill);
    // this.pg.rect(0, 0, this.pg.width, this.pg.height);
    this.pg.circle(r, r, r * 2);
    // let img = p.createImage(2 * r, 2 * r);
    // img.loadPixels();

    // for (let y = 0; y < img.height; y++) {
    //   for (let x = 0; x < img.width; x++) {
    //     let index = (x + y * img.width) * 4;
    //     img.pixels[index] = p.red(this.fill);
    //     img.pixels[index + 1] = p.green(this.fill);
    //     img.pixels[index + 2] = p.blue(this.fill);
    //     img.pixels[index + 3] = p.alpha(this.fill);
    //   }
    // }
    // img.updatePixels();
    // this.pg.image(img, 0, 0);
    // this.pg.square(0, 0, this.radius * 2);
  }

  update(p: p5) {
    this.moons.forEach((m) => m.update(p));
    this.angle += this.speed;
  }

  draw(p: p5) {
    p.push();
    p.rotate(this.angle);
    p.translate(this.distance - this.radius, -this.radius);

    // p.noStroke();
    // p.fill(this.fill);
    // p.ellipse(0, 0, this.radius);
    // this.pg.loadPixels();
    // for (let x = 0; x < this.pg.width; x++) {
    //   for (let y = 0; y < this.pg.height; y++) {
    //     const index = y * 4 * this.pg.width + x * 4 + 3;
    //     this.pg.pixels[index] = p.noise(x / 100, y / 100, p.frameCount / 1000) * 100 + 155;
    //   }
    // }

    // this.pg.updatePixels();
    p.image(this.pg, 0, 0);
    p.translate(this.radius, this.radius);

    this.moons.forEach((m) => m.draw(p));
    p.pop();
  }
}
