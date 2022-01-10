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
    const planets: CelestialObject[] = [];
    const numPlanets = 6; //p.int(p.random(3, 6));
    const maxD = p.height / 2;
    let currD = 0;
    for (let i = 0; i < numPlanets; i++) {
      // const distanceFromLastPlanet = p.random(50, 100);
      const prevPlanet = planets[i - 1];
      const s = !prevPlanet ? p.random(20, 50) : p.random(prevPlanet.speed / 2, prevPlanet.speed);
      const d = !prevPlanet ? p.random(50, 100) : p.random(50, 100) + prevPlanet.distance + prevPlanet.radius;
      currD += d;
      const r = !prevPlanet ? p.random(3, 6) : p.random(5, 30);
      const planet = new CelestialObject(p, r, d, p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255)), s, []);
      planets.push(planet);
    }
    this.sun = new CelestialObject(p, 40, 0, p.color(252, 229, 112), 0, planets);
    // [
    //   new CelestialObject(p, 6, 150, p.color('#B5A7A7')),
    //   new CelestialObject(p, 8, 200, p.color('#DDD8D4')),
    //   new CelestialObject(p, 10, 250, p.color('#8CB1DE')),
    // ]);
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
