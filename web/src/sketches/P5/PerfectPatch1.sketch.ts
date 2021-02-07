import MidiSketch from './MidiSketch';
import { MidiEventEmitter } from '@reactive-sketch-easel/midi';

import { Scene, Scene2, Scene3, Scene1 } from './PerfectPatch1.sketch/scenes';
import { MidiData, randomBoolean } from './PerfectPatch1.sketch/data';

export default class PerfectPatch1 extends MidiSketch {
  step: number;
  scene: Scene;
  sceneIndex = -1;
  d = new MidiData();
  reset() {
    this.step = -1;
    this.sceneIndex = (this.sceneIndex + 1) % 2;
    if (this.sceneIndex === 0) {
      this.scene = randomBoolean() ? new Scene2() : new Scene3();
    } else {
      this.scene = new Scene1();
    }
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
    MidiEventEmitter.ccBind<MidiData>(51, 'bd', this.d, 3);
    MidiEventEmitter.ccBind<MidiData>(52, 'bass', this.d, 0.2);
  }
  draw() {
    const p = this.p;
    this.scene.draw(p, this.d);
  }
}
