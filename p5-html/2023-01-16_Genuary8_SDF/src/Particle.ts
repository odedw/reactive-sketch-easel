import { Graphics } from 'p5';
import { Lfo } from '../../utils/p5.modulate';

export class Particle {
  lfoX: Lfo;
  lfoY: Lfo;
  constructor(lfoX: Lfo, lfoY: Lfo) {
    this.lfoX = lfoX;
    this.lfoY = lfoY;
  }

  draw(pg: Graphics) {
    pg.circle(this.lfoX.get(), this.lfoY.get(), 10);
  }
}
