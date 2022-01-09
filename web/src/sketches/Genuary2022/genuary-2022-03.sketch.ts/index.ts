import ProcessingSketch from '../../ProcessingSketch';
import { CelestialObject } from './CelestialObject';
import { Twinkle } from './Twinkle';

const NUM_TWINKLES = 300;
export default class Template extends ProcessingSketch {
  celestialObjects: CelestialObject[] = [];
  twinkles: Twinkle[] = [];

  sun;
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    this.sun = new CelestialObject(p, 20, 0, p.color(252, 229, 112));
    this.celestialObjects.push(this.sun);
    p.ellipseMode(p.RADIUS);
    for (let i = 0; i < NUM_TWINKLES; i++) {
      this.twinkles.push(new Twinkle(p));
    }
  }
  draw() {
    const p = this.p;
    p.background(0);
    for (const t of this.twinkles) {
      t.draw(p);
    }
    for (const co of this.celestialObjects) {
      co.draw(p);
    }
  }
}
