import MidiSketch from '../MidiSketch';
import MidiEventEmitter from '../../midi/MidiEventEmitter';

export default class PerfectPatch1 extends MidiSketch {
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
  }
  draw() {
    const p = this.p;
    p.background(200);
  }
}
