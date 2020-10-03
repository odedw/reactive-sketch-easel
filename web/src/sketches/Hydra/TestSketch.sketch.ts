import HydraSketch from './HydraSketch';
import MidiEventEmitter from '../../midi/MidiEventEmitter';

class MidiData {
  bd: number = 0;
}
export default class TestSketch extends HydraSketch {
  d = new MidiData();
  setup() {
    // MidiEventEmitter.init();
    // MidiEventEmitter.ccBind<MidiData>(51, 'bd', this.d, 0.01);
  }
  run() {
    // s0.initScreen();
    // src(s0).contrast(1).luma(0.1).brightness(0.01).scale(1.2, 1.2).repeat(3, 3).pixelate(300, 300).out();
  }
}
