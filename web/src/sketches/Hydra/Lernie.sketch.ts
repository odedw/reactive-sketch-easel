import HydraSketch from './HydraSketch';
import { listInputs, Input } from '@reactive-sketch-easel/midi';
import { OutputBuffer } from './types';

class OscMidiData {
  amp = 0;
  freq = 0;
  sync = 0;
  offset = 0;
}

class MidiData {
  osc1 = new OscMidiData();
  osc2 = new OscMidiData();
}
export default class TestSketch extends HydraSketch {
  d = new MidiData();
  input: Input;
  // 13 29 49
  bindOsc(md: OscMidiData, index: number) {
    this.input.ccBind<OscMidiData>(77 + index, 'amp', md, 1 / 127);
    this.input.ccBind<OscMidiData>(13 + index, 'freq', md, 60 / 127);
    this.input.ccBind<OscMidiData>(29 + index, 'sync', md, -1 / 127);
    this.input.ccBind<OscMidiData>(49 + index, 'offset', md, 10 / 127);
  }
  setup() {
    Input.create('Launch Control XL').then((i) => {
      this.input = i;
      this.bindOsc(this.d.osc1, 0);
      this.bindOsc(this.d.osc2, 1);
    });
    listInputs();
  }
  runOsc(o: OutputBuffer, md: OscMidiData) {
    osc(
      () => md.freq,
      () => md.sync,
      () => md.offset
    ).out(o);
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
