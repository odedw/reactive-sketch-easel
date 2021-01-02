import MidiEventEmitter from '../../../../midi/MidiEventEmitter';
import Scene from './Scene';
import { MidiData } from '../types';

export default class Scene3 extends Scene {
  rotation = 0;
  load() {
    this.subscriptions = [
      MidiEventEmitter.ccTriger(51, 25).subscribe(() => (this.rotation = Math.PI / 4 - this.rotation)),
    ];
  }
  render(d: MidiData) {
    osc(20, 0.2, 1)
      .rotate(0.4, 0.4)

      .modulatePixelate(osc(10, 0.1))
      .pixelate(100, 100)
      .kaleid()
      .rotate(() => this.rotation)
      .repeat(3, 3)
      .pixelate(400, 400)
      // .colorama()

      .out(o2);
  }
}
