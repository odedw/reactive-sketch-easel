import MidiEventEmitter from '../../../midi/MidiEventEmitter';
import Scene from './Scene';
import { MidiData } from './types';

export default class Scene1 extends Scene {
  invert = 0;
  load() {
    this.subscriptions = [
      MidiEventEmitter.ccTriger(51, 10).subscribe(() => {
        this.invert = 1 - this.invert;
      }),
    ];
  }
  render(d: MidiData) {
    osc(40, 0.01, 1)
      .rotate(Math.PI, 0.1)
      .kaleid()
      .pixelate(50, 50)
      .color(
        () => 1 + d.bd,
        () => 1 + d.bd,
        () => 1 + d.bd
      )
      .modulateScale(osc(10, 0.1, 1))

      .repeat()
      .pixelate(300, 300)
      //   .blend(noise(), () => d.braids)
      .out(o2);
  }
}
