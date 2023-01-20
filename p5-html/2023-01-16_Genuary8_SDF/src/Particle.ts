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

  step(/*pg: Graphics*/) {
    // pg.circle(this.lfoX.get(), this.lfoY.get(), this.lfoS.get());
    // if (this.lfoS.get() < 1) {
    // this.lfoS.stopFor(60);
    // console.log('stopped');
    // } else {
    // console.log(this.lfoS.get());
    // }
  }
}
