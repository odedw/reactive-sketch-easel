import { MidiEventEmitter } from '@reactive-sketch-easel/midi';

import Scene from './Scene';
import { MidiData } from '../types';

export default class Scene4 extends Scene {
  shape = 3;
  noise = 0;
  scale = 0;

  load() {
    this.subscriptions = [
      MidiEventEmitter.ccTriger(51, 30).subscribe(() => {
        if (Math.random() < 0.5) {
          this.shape = 3 - this.shape;
        } else {
          this.noise = 20 - this.noise;
        }
        this.scale = 0.5 - this.scale;
      }),
    ];
  }
  render(d: MidiData) {
    osc(10, 0.1, 1)
      .blend(
        src(o0)
          .scale(
            1,
            ({ time }) => Math.sin(time / 5),
            ({ time }) => Math.cos(time / 5)
          )
          .modulate(osc())
      )
      .diff(
        shape(() => this.shape + 3)
          .scale(1, 1, 2)
          .rotate(Math.PI)
          .modulate(noise(() => this.noise + 3, 0.5))
      )
      .scrollX(({ time }) => time / 5)
      .scale(() => this.scale - 1)
      .rotate(({ time }) => time / 15)
      .repeat(5, 5)
      .kaleid()
      .colorama()
      .pixelate(300, 300)

      .out(o2);
  }
}
