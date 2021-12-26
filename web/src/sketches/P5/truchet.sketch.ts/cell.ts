import p5 from 'p5';

export const TILE_SIZE = 30;

export class Cell {
  type: number;
  constructor(p: p5) {
    this.type = p.floor(p.random(0, 4));
  }

  render(p: p5) {
    p.fill(255).strokeWeight(0);
    switch (this.type) {
      case 0:
        p.triangle(-TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE / 2);
        break;
      case 1:
        p.triangle(-TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE / 2, -TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE / 2);
        break;
      case 2:
        p.triangle(-TILE_SIZE / 2, -TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE / 2);
        break;
      case 3:
        p.triangle(-TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE / 2);
        break;
    }
  }
}
