import ProcessingSketch from '../../ProcessingSketch';
import { CelestialObject } from './CelestialObject';
import { Twinkle } from './Twinkle';

const NUM_TWINKLES = 2000;
export default class Template extends ProcessingSketch {
  celestialObjects: CelestialObject[] = [];
  twinkles: Twinkle[] = [];

  sun;
  setup() {
    const p = this.p;
    p.angleMode(p.DEGREES);
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    // debugger;
    let planets: CelestialObject[] = [];
    // const numPlanets = 6; //p.int(p.random(3, 6));
    // const maxD = p.height / 2;
    let currD = 0;
    // for (let i = 0; i < numPlanets; i++) {
    //   // const distanceFromLastPlanet = p.random(50, 100);
    //   const prevPlanet = planets[i - 1];
    //   const s = !prevPlanet ? p.random(20, 50) : p.random(prevPlanet.speed / 2, prevPlanet.speed);
    //   const d = !prevPlanet ? p.random(50, 100) : p.random(50, 100) + prevPlanet.distance + prevPlanet.radius;
    //   currD += d;
    //   const r = !prevPlanet ? p.random(3, 6) : p.random(5, 30);
    //   const planet = new CelestialObject(p, r, d, p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255)), s, []);
    //   planets.push(planet);
    // }
    const pixelsPerDistanceUnit = 70;
    const sizeRatio = 1;
    const speedUnit = 2;

    planets = [
      new CelestialObject(
        p,
        4,
        Math.log(3.9) * pixelsPerDistanceUnit,
        p.color('#B5A7A7'),
        (1 / Math.log(88)) * speedUnit
      ), //mercury
      new CelestialObject(
        p,
        8,
        Math.log(7.2) * pixelsPerDistanceUnit,
        p.color('#DDD8D4'),
        (1 / Math.log(225)) * speedUnit
      ), //venus
      new CelestialObject(
        p,
        9,
        Math.log(10) * pixelsPerDistanceUnit,
        p.color('#8CB1DE'),
        (1 / Math.log(365)) * speedUnit
      ), //earth
      new CelestialObject(
        p,
        6,
        Math.log(15.2) * pixelsPerDistanceUnit,
        p.color('#E27B58'),
        (1 / Math.log(687)) * speedUnit
      ), //mars
      new CelestialObject(
        p,
        15,
        Math.log(52) * pixelsPerDistanceUnit,
        p.color('#D39C7E'),
        (1 / Math.log(4333)) * speedUnit
      ), //jupiter
      new CelestialObject(
        p,
        14,
        Math.log(95.4) * pixelsPerDistanceUnit,
        p.color('#C5AB6E'),
        (1 / Math.log(10759)) * speedUnit
      ), //saturn
      new CelestialObject(
        p,
        10,
        Math.log(192) * pixelsPerDistanceUnit,
        p.color('#BBE1E4'),
        (1 / Math.log(30687)) * speedUnit
      ), //uranus
      new CelestialObject(
        p,
        10,
        Math.log(300.6) * pixelsPerDistanceUnit,
        p.color('#6081FF'),
        (1 / Math.log(60190)) * speedUnit
      ), //neptune
    ];
    this.sun = new CelestialObject(p, 50, 0, p.color(252, 229, 112), 0, planets);

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
    p.translate(p.width / 2, p.height / 2);
    for (const co of this.celestialObjects) {
      co.update(p);
      co.draw(p);
    }
  }
}
