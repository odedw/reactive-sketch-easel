import p5 from 'p5';

export const TILE_SIZE = 30;

export class Cell {
  constructor() {}

  render(p: p5) {
    p.circle(0, 0, TILE_SIZE);
  }
}
