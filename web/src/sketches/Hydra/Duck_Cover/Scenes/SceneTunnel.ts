// import { MidiEventEmitter } from '@reactive-sketch-easel/midi';

import Scene from './Scene';
import { MidiData } from '../types';

export default class SceneTunnel extends Scene {
  render(d: MidiData) {
    osc(50, 0.01, 1)
      .scrollX(({ time }) => time / 100)
      .kaleid(100)

      .pixelate(400, 400)

      .scale(1, 1, 1.5)
      .colorama(({ time }) => Math.sin(time / 10))
      .diff(
        osc(60, 0.01, 1)
          .scrollX(({ time }) => time / 100)
          .kaleid(10)

          .pixelate(400, 400)

          .scale(1, 1, 1.5)
          .colorama(({ time }) => Math.sin(time / 5))
      )
      .color(
        () => 1 + d.bd,
        () => 1 + d.bd,
        () => 1 + d.bd
      )
      .out(o1);
  }
  load() {}
}
