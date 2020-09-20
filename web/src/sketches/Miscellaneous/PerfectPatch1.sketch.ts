import MidiSketch from '../MidiSketch';
import MidiEventEmitter from '../../midi/MidiEventEmitter';
import { Scene, Scene2, Scene3 } from './PerfectPatch1.sketch/scenes';
import { MidiData } from './PerfectPatch1.sketch/data';

export default class PerfectPatch1 extends MidiSketch {
  step: number;
  scene: Scene;
  d = new MidiData();
  reset() {
    this.step = -1;
    // this.scene = new Scene1();
    this.scene = new Scene3();
  }
  setup() {
    const p = this.p;
    p.rectMode(p.CENTER);
    p.createCanvas(this.w, this.h);
    p.strokeWeight(0);
    p.frameRate(60);
    p.strokeJoin(p.BEVEL);
    MidiEventEmitter.noteOn('D4').subscribe(() => {
      this.step++;
      this.scene.setStep(this.step);
    });
    MidiEventEmitter.noteOn('C4').subscribe(() => {
      this.reset();
    });
    this.reset();
    MidiEventEmitter.ccBind<MidiData>(51, 'bd', this.d, 1);
  }
  draw() {
    const p = this.p;
    // skip(x).every(y) to determine end of 4 bars
    this.scene.draw(p, this.d);
  }
}
