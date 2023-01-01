import { Lfo, Modulate } from '../../utils/p5.modulate';
import * as M from '../../utils/math';
const FPS = 60;

export class Particle {
  a: number;
  d: number;
  lfo: Lfo;
  sway: number;
  fill: string;
  rotation: Lfo;
  constructor(a: number, d: number, lfo: Lfo, sway: number, fill: string) {
    this.a = a;
    this.d = d;
    this.lfo = lfo;
    this.sway = sway;
    this.fill = fill;
    this.rotation = Modulate.createSawLfo(FPS * 20, { from: 0, to: TWO_PI });
  }

  draw() {
    push();
    translate(width / 2, height / 2);
    const p = M.polarToCartesian(this.d + this.lfo.get() * this.sway, this.a + this.rotation.get());
    fill(this.fill);
    circle(p.x, p.y, this.lfo.get() * 60);
    pop();
  }
}
