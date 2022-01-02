import p5 from 'p5';

export const TILE_SIZE = 30;
const FRAME = 60 * 5;

export class Cell {
  type: number;
  rotation: number;
  startFrame: number;
  constructor(p: p5, type: number | undefined = undefined) {
    this.type = type ?? p.floor(p.random(0, 4));
    this.rotation = p.floor(p.random(1, 3)) * 90 * (p.random(0, 1) < 0.5 ? 1 : -1);
    this.startFrame = p.frameCount;
  }

  render(p: p5, timeline: number) {
    p.fill(255).strokeWeight(0);
    // const framesLeft = p.max(0, FRAME - (p.frameCount - this.startFrame));

    // p.rotate((this.rotation * framesLeft) / FRAME);
    p.rotate(timeline * this.rotation);
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

  flipH() {
    if (this.type === 0) this.type = 1;
    else if (this.type === 1) this.type = 0;
    else if (this.type === 2) this.type = 3;
    else if (this.type === 3) this.type = 2;
  }

  flipV() {
    if (this.type === 0) this.type = 3;
    else if (this.type === 1) this.type = 2;
    else if (this.type === 2) this.type = 1;
    else if (this.type === 3) this.type = 0;
  }

  flip() {
    this.flipH();
    this.flipV();
  }
}
