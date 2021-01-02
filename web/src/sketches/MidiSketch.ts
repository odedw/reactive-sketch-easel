import ProcessingSketch from './ProcessingSketch';
import { MidiEventEmitter } from '@reactive-sketch-easel/midi';

export default abstract class MidiSketch extends ProcessingSketch {
  constructor() {
    super();
    MidiEventEmitter.init();
  }
}
