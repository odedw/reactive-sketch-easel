import HydraSketch from '../HydraSketch';
import MidiEventEmitter from '../../midi/MidiEventEmitter';

class MidiData {
  bd: number = 0;
}
export default class TestSketch extends HydraSketch {
  d = new MidiData();
  setup() {
    MidiEventEmitter.init();
    MidiEventEmitter.ccBind<MidiData>(51, 'bd', this.d, 0.01);
  }
  run() {
    osc(10).out(o2);
    osc(20).modulate(o2).out(o0);
    osc(20)
      .rotate(({ time }) => Math.sin(time / 10) * 10)
      .modulate(o1)
      .modulate(o0)
      .out(o1);
    src(o0)
      .blend(o1)
      .kaleid(6)
      .scale(() => 1 + this.d.bd)
      .out();
  }
}
