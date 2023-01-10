import { Color, Graphics } from 'p5';
import { Lfo } from '../../utils/p5.modulate';

export class Particle {
  x: number;
  y: number;
  lfo: Lfo;
  fill: Color;
  constructor(x: number, y: number, fill: Color, lfo: Lfo) {
    this.x = x;
    this.y = y;
    this.lfo = lfo;
    this.fill = fill;
  }

  draw(pg: Graphics) {
    pg.strokeWeight(2);
    pg.stroke(255);
    pg.fill(this.fill);
    pg.circle(this.x, this.y, this.lfo.get());
  }
}
