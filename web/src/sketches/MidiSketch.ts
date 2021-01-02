import ProcessingSketch from './ProcessingSketch';
import MidiEventEmitter from '../midi/MidiEventEmitter';

export default abstract class MidiSketch extends ProcessingSketch {
  constructor() {
    super();
    MidiEventEmitter.init();
  }
}
