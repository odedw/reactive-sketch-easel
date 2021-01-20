import HydraSketch from './HydraSketch';
import { listInputs, Input } from '@reactive-sketch-easel/midi';
import { OutputBuffer } from './types';

class OscMidiData {
  amp = 0;
  freq = 60;
  sync = 0;
  offset = 0;
  rotate = 0;
  kaleid = 1;
  pixelate = 1500;
}

class MidiData {
  osc1 = new OscMidiData();
  osc2 = new OscMidiData();
}
export default class TestSketch extends HydraSketch {
  d = new MidiData();
  input: Input;
  // 13 29 49
  bindOsc(md: OscMidiData, startCc: number, ampCc: number) {
    this.input.ccBind<OscMidiData>(startCc, 'freq', md, 0, 80);
    this.input.ccBind<OscMidiData>(startCc + 1, 'sync', md, -0.5, 0.5);
    this.input.ccBind<OscMidiData>(startCc + 2, 'offset', md, 0, 10);
    this.input.ccBind<OscMidiData>(startCc + 3, 'rotate', md, 0, Math.PI * 4);
    this.input.ccBind<OscMidiData>(startCc + 4, 'kaleid', md, 1, 50);
    this.input.ccBind<OscMidiData>(startCc + 5, 'pixelate', md, 10, 1500);
    this.input.ccBind<OscMidiData>(ampCc, 'amp', md, 0, 1);
  }
  setup() {
    Input.create('Launch Control XL').then((i) => {
      this.input = i;
      this.bindOsc(this.d.osc1, 13, 77);
      this.bindOsc(this.d.osc2, 29, 78);
    });
    listInputs();
  }
  runOsc(o: OutputBuffer, md: OscMidiData) {
    osc(
      () => md.freq,
      () => md.sync,
      () => md.offset
    )
      .rotate(() => md.rotate)
      .kaleid(() => md.kaleid)
      .pixelate(
        () => md.pixelate,
        () => md.pixelate
      )
      .out(o);
  }
  run() {
    this.runOsc(o1, this.d.osc1);
    this.runOsc(o2, this.d.osc2);

    solid(0, 0, 0, 0)
      .blend(src(o1), () => this.d.osc1.amp)
      .blend(src(o2), () => this.d.osc2.amp)
      .out();
  }
}
