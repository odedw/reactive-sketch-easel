// import { MidiEventEmitter } from '@reactive-sketch-easel/midi';

import Scene from './Scene';
import { MidiData } from '../types';

export default class IntroScene extends Scene {
  load() {}
  render(d: MidiData) {
    osc(50, 0.01, 1)
      .blend(osc(50, -0.01, 1), 0.5)
      .blend(osc(50, 0.01, 1).rotate(Math.PI / 2), 0.5)
      .blend(osc(50, 0.01, 1).rotate((Math.PI * 3) / 2), 0.5)
      .pixelate(350, 350)
      .colorama(({ time }) => Math.sin(time / 10))

      .out(o3);
  }
}
