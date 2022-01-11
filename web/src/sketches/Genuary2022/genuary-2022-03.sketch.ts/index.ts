import { Image } from 'p5';
import ProcessingSketch from '../../ProcessingSketch';
import { CelestialObject } from './CelestialObject';
import { Twinkle } from './Twinkle';

const NUM_TWINKLES = 2000;
export default class Template extends ProcessingSketch {
  celestialObjects: CelestialObject[] = [];
  twinkles: Twinkle[] = [];

  sun;
  jupiter: Image;
  images: Image[] = [];
  preload() {
    this.images.push(this.p.loadImage('/assets/planets/sun.jpg'));
    this.images.push(this.p.loadImage('/assets/planets/mercury.jpg'));
    this.images.push(this.p.loadImage('/assets/planets/venus.jpg'));
    this.images.push(this.p.loadImage('/assets/planets/earth.jpg'));
    this.images.push(this.p.loadImage('/assets/planets/mars.jpg'));
    this.images.push(this.p.loadImage('/assets/planets/jupiter.jpg'));
    this.images.push(this.p.loadImage('/assets/planets/saturn.jpg'));
    this.images.push(this.p.loadImage('/assets/planets/uranus.jpg'));
    this.images.push(this.p.loadImage('/assets/planets/neptune.jpg'));
  }
  setup() {
    const p = this.p;
    p.angleMode(p.DEGREES);
    p.createCanvas(this.w, this.h, p.WEBGL);
    p.frameRate(60);
    let planets: CelestialObject[] = [];
    // p.camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);
    const pixelsPerDistanceUnit = 70;
    const speedUnit = 2;

    planets = [
      new CelestialObject(
        p,
        4,
        Math.log(3.9) * pixelsPerDistanceUnit,
        p.color('#B5A7A7'),
        (1 / Math.log(88)) * speedUnit,
        [],
        this.images[1]
      ), //mercury
      new CelestialObject(
        p,
        8,
        Math.log(7.2) * pixelsPerDistanceUnit,
        p.color('#DDD8D4'),
        (1 / Math.log(225)) * speedUnit,
        [],
        this.images[2]
      ), //venus
      new CelestialObject(
        p,
        9,
        Math.log(10) * pixelsPerDistanceUnit,
        p.color('#8CB1DE'),
        (1 / Math.log(365)) * speedUnit,
        [],
        this.images[3]
      ), //earth
      new CelestialObject(
        p,
        6,
        Math.log(15.2) * pixelsPerDistanceUnit,
        p.color('#E27B58'),
        (1 / Math.log(687)) * speedUnit,
        [],
        this.images[4]
      ), //mars
      new CelestialObject(
        p,
        15,
        Math.log(52) * pixelsPerDistanceUnit,
        p.color('#D39C7E'),
        (1 / Math.log(4333)) * speedUnit,
        [],
        this.images[5]
      ), //jupiter
      new CelestialObject(
        p,
        14,
        Math.log(95.4) * pixelsPerDistanceUnit,
        p.color('#C5AB6E'),
        (1 / Math.log(10759)) * speedUnit,
        [],
        this.images[6]
      ), //saturn
      new CelestialObject(
        p,
        10,
        Math.log(192) * pixelsPerDistanceUnit,
        p.color('#BBE1E4'),
        (1 / Math.log(30687)) * speedUnit,
        [],
        this.images[7]
      ), //uranus
      new CelestialObject(
        p,
        10,
        Math.log(300.6) * pixelsPerDistanceUnit,
        p.color('#6081FF'),
        (1 / Math.log(60190)) * speedUnit,
        [],
        this.images[8]
      ), //neptune
    ];
    this.sun = new CelestialObject(p, 50, 0, p.color(252, 229, 112), 0, planets, this.images[0]);

    this.celestialObjects.push(this.sun);
    p.ellipseMode(p.RADIUS);
    for (let i = 0; i < NUM_TWINKLES; i++) {
      this.twinkles.push(new Twinkle(p));
    }
  }
  draw() {
    const p = this.p;
    p.background(0, 0, 0);
    p.push();
    p.rotate(p.frameCount / 1000);
    for (const t of this.twinkles) {
      t.draw(p);
    }
    p.pop();
    p.lights();
    // p.translate(p.width / 2, p.height / 2);
    for (const co of this.celestialObjects) {
      co.update(p);
      co.draw(p);
    }
  }
}
