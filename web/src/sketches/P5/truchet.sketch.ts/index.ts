import ProcessingSketch from '../../ProcessingSketch';
import { Matrix } from '../../../utils/Matrix';
import { Cell, TILE_SIZE } from './cell';
const NUMBER_OF_TILES = 10;

export default class Template extends ProcessingSketch {
  matrix: Matrix<Cell>;
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    p.rectMode(p.CENTER);
    this.matrix = new Matrix<Cell>(NUMBER_OF_TILES, NUMBER_OF_TILES, () => new Cell(p));
  }
  draw() {
    const p = this.p;
    p.background(0);
    const x = p.width / 2 - ((NUMBER_OF_TILES * TILE_SIZE) / 2 + TILE_SIZE / 2);
    const y = p.height / 2 - ((NUMBER_OF_TILES * TILE_SIZE) / 2 + TILE_SIZE / 2);
    for (let i = 0; i < NUMBER_OF_TILES; i++) {
      for (let j = 0; j < NUMBER_OF_TILES; j++) {
        p.push();
        p.translate(x + j * TILE_SIZE, y + i * TILE_SIZE);
        this.matrix.get(i, j).render(p);
        p.pop();
      }
    }
  }
}
