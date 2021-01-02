import { MidiEventEmitter } from '@reactive-sketch-easel/midi';

import Scene from './Scene';
import { MidiData } from '../types';

export class Scene2 extends Scene {
  invert = 0;
  load() {
    this.subscriptions = [MidiEventEmitter.ccTriger(51, 25).subscribe(() => (this.invert = 1 - this.invert))];
  }
  render(d: MidiData) {
    osc(40, 0.01, 1)
      .rotate(Math.PI, 0.1)
      .kaleid()
      .pixelate(50, 50)
      .scale(({ time }) => 1 + Math.sin(time / 3) * 0.5)
      // .brightness(0)
      .color(0.8, 0.8, 0.8)
      // .color(
      //   () => 1 + d.bd,
      //   () => 1 + d.bd,
      //   () => 1 + d.bd
      // )
      .invert(() => this.invert)
      .color(0.7, 0.7, 0.7)
      .modulateScale(noise(), 0.1)

      .repeat()
      .pixelate(300, 300)

      .out(o2);
  }
}
