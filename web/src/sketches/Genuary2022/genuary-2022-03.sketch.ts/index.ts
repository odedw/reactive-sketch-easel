import { Image } from 'p5';
import { Output } from 'rmidi';
import ProcessingSketch from '../../ProcessingSketch';
import { CelestialObject } from './CelestialObject';
import { Twinkle } from './Twinkle';

const NUM_TWINKLES = 2000;
export default class Template extends ProcessingSketch {
  celestialObjects: CelestialObject[] = [];
  twinkles: Twinkle[] = [];
  output: Output;

  sun: CelestialObject;
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
    Output.create('p5')
      .then((o) => {
        console.log(`===========================initialized`);

        this.output = o;
      })
      .catch((e) => {
        console.log('===========================');
        console.log(e);
        console.log('===========================');
      });
  }
  setup() {
    this.onTrigger = this.onTrigger.bind(this);
    const p = this.p;
    p.angleMode(p.DEGREES);
    p.createCanvas(this.w, this.h, p.WEBGL);
    p.frameRate(60);
    // p.camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);
    const pd = 70;
    const su = 3;
    let planets = [
      new CelestialObject(p, 4, Math.log(3.9) * pd, (1 / Math.log(88)) * su, this.images[1], this.onTrigger), //mercury
      new CelestialObject(p, 8, Math.log(6) * pd, (1 / Math.log(225)) * su, this.images[2], this.onTrigger), //venus
      new CelestialObject(p, 9, Math.log(9) * pd, (1 / Math.log(365)) * su, this.images[3], this.onTrigger), //earth
      new CelestialObject(p, 6, Math.log(14.2) * pd, (1 / Math.log(687)) * su, this.images[4], this.onTrigger), //mars
      new CelestialObject(p, 15, Math.log(34) * pd, (1 / Math.log(4333)) * su, this.images[5], this.onTrigger), //jupiter
      new CelestialObject(
        p,
        14,
        Math.log(80) * pd,
        (1 / Math.log(10759)) * su,
        this.images[6],
        this.onTrigger,
        [],
        true
      ), //saturn
      new CelestialObject(p, 10, Math.log(180) * pd, (1 / Math.log(30687)) * su, this.images[7], this.onTrigger), //uranus
      new CelestialObject(p, 10, Math.log(280) * pd, (1 / Math.log(60190)) * su, this.images[8], this.onTrigger), //neptune
    ];
    this.sun = new CelestialObject(p, 50, 0, 0, this.images[0], this.onTrigger, planets);
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
    p.rotateZ(p.frameCount / 100);
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

  onTrigger(c: CelestialObject) {
    if (c === this.sun) return;
    const index = this.sun.moons.indexOf(c);
    let note = '';
    let duration = this.p.floor(this.p.random(5000, 10000));
    let octave = this.p.floor(this.p.random(3, 5));
    if (index === 0) {
      //mercury
      note = 'C';
      duration = 4000;
    } else if (index === 1) {
      //venus
      note = 'D';
    } else if (index === 2) {
      //earth
      note = 'E';
    } else if (index === 3) {
      //mars
      note = 'F#';
    } else if (index === 4) {
      //jupiter
      note = 'G';
    } else if (index === 5) {
      //saturn
      note = 'A';
    } else if (index === 6) {
      //uranus
      note = 'B';
    } else if (index === 7) {
      //neptune
      note = 'C';
      octave = 2;
      duration = 16000;
    }
    console.log(`${note} | ${index + 1} | ${duration}`);
    this.output?.midiOutput.playNote(`${note}${octave.toString()}`, index + 1, {
      duration,
    });
  }
}
