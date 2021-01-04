import MidiSketch from '../MidiSketch';
import { listOutputs, Output } from '@reactive-sketch-easel/midi';
export default class MidiTest extends MidiSketch {
  output: Output;
  constructor() {
    super();
    Output.create('MOTU Pro Audio Midi Out').then((o) => (this.output = o));
  }

  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
  }
  draw() {
    const p = this.p;
  }

  keyPressed() {
    super.keyPressed();
    if (this.p.keyCode === 32) {
      this.output.panic();
    } else {
      this.output.sendNote();
    }
  }

  keyReleased() {
    super.keyReleased();
    this.output.noteOff();
  }


}
