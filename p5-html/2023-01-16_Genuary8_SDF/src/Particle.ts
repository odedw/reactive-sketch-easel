import { Graphics } from 'p5';
import { Lfo } from '../../utils/p5.modulate';

export class Particle {
  lfoX: Lfo;
  lfoY: Lfo;
  lfoS: Lfo;
  size = 10;
  constructor(lfoX: Lfo, lfoY: Lfo, lfoS: Lfo) {
    this.lfoX = lfoX;
    this.lfoY = lfoY;
    this.lfoS = lfoS;
  }

  draw(pg: Graphics) {
    pg.circle(this.lfoX.get(), this.lfoY.get(), lfoS.get());
  }
}
