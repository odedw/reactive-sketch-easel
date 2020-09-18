import Sketch from '../Sketch';
import { gsap } from 'gsap';
import p5 from 'p5';

const CENTRAL_DISC_SIZE = 70;
const SMALL_INDUCER_SIZE = 30;
const LARGE_INDUCER_SIZE = 130;
const LARGE_INDUCER_DISTANCE_MULTIPLIER = 1.2;
const DISTANCE_FROM_CENTER = 160;
const NUMBER_OF_SMALL_INDUCERS = 8;
const NUMBER_OF_LARGE_INDUCERS = 6;

const data = {
  centralDiscX: 0,
  centralDiscOpacity: 0,
  inducerDistancePercent: 0,
  inducerRotation: 0,
  inducerSizePercent: 0,
  centralDiscAngle: 0,
};
export default class EbbinghausIllusion extends Sketch {
  create(): p5 {
    return super.create(800, 800);
  }

  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    p.angleMode(p.DEGREES);

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(data, { centralDiscOpacity: 255, duration: 0 }, '+=2')
      .to(data, { centralDiscX: DISTANCE_FROM_CENTER, duration: 0.5 }, '+=2')
      .to(data, { inducerDistancePercent: 100, duration: 1 }, '+=2')
      .to(data, { inducerSizePercent: 100, duration: 1 }, '-=1')
      // .to(data, { centralDiscAngle: 180, duration: 5, ease: 'power1.inOut' }, '+=5')
      .to(data, { inducerDistancePercent: 0, duration: 1 }, '+=10')
      .to(data, { inducerSizePercent: 0, duration: 1 }, '-=1')
      .to(data, { centralDiscX: 0, duration: 0.5 }, '+=2')
      .to(data, { centralDiscOpacity: 0, duration: 0 }, '+=2');
  }
  draw() {
    const p = this.p;
    p.background(200);

    //right disc
    this.drawSide(data.centralDiscX, SMALL_INDUCER_SIZE, NUMBER_OF_SMALL_INDUCERS);

    //left disc
    this.drawSide(-data.centralDiscX, LARGE_INDUCER_SIZE, NUMBER_OF_LARGE_INDUCERS, LARGE_INDUCER_DISTANCE_MULTIPLIER);
  }

  drawSide(dx: number, inducerSize: number, numOfInducers: number, inducerDistanceMultiplier = 1) {
    const p = this.p;

    p.push();
    p.translate(this.center.x, this.center.y);
    const discX = dx * p.cos(data.centralDiscAngle % 360);
    const discY = dx * p.sin(data.centralDiscAngle % 360);
    p.translate(discX, discY);
    let angle = p.frameCount % 360;
    p.strokeWeight(0).fill(145, 164, 185);
    for (let i = 0; i < numOfInducers; i++) {
      // p.push();
      const distance =
        ((CENTRAL_DISC_SIZE + (inducerSize * 3 * inducerDistanceMultiplier) / 2) * data.inducerDistancePercent) / 100;
      const x = (distance / 2) * p.cos(angle);
      const y = (distance / 2) * p.sin(angle);
      p.ellipse(x, y, (inducerSize * data.inducerSizePercent) / 100);
      angle += 360 / numOfInducers;
    }
    p.strokeWeight(0).fill(230, 127, 27, data.centralDiscOpacity).ellipse(0, 0, CENTRAL_DISC_SIZE);
    p.pop();
  }
}
