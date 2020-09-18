import Sketch from './Sketch';
import MidiEventEmitter from '../midi/MidiEventEmitter';

export default abstract class MidiSketch extends Sketch {
  constructor() {
    super();
    MidiEventEmitter.init();
  }
}
