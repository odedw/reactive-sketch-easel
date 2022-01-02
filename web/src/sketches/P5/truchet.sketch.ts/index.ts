import ProcessingSketch from '../../ProcessingSketch';
import { Matrix } from '../../../utils/Matrix';
import { Cell, TILE_SIZE } from './cell';
import { gsap } from 'gsap';
const NUMBER_OF_TILES = 20;

export default class Template extends ProcessingSketch {
  matrix: Matrix<Cell>;
  timeline: number = 0;
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.frameRate(60);
    p.rectMode(p.CENTER);
    p.angleMode(p.DEGREES);
    this.matrix = new Matrix<Cell>(NUMBER_OF_TILES, NUMBER_OF_TILES, () => new Cell(p));
    for (let i = 0; i < NUMBER_OF_TILES / 2; i++) {
      for (let j = 0; j < NUMBER_OF_TILES / 2; j++) {
        const tile = this.matrix.get(i, j);
        const oppositeH = this.matrix.get(i, NUMBER_OF_TILES - 1 - j);
        const oppositeV = this.matrix.get(NUMBER_OF_TILES - 1 - i, j);
        const opposite = this.matrix.get(NUMBER_OF_TILES - 1 - i, NUMBER_OF_TILES - 1 - j);
        opposite.type = oppositeH.type = oppositeV.type = tile.type;
        oppositeV.flipV();
        oppositeH.flipH();
        opposite.flip();
      }
    }
    gsap.fromTo(
      this,
      {
        timeline: 1,
      },
      {
        timeline: 0,
        duration: 3,
        ease: 'expo.out',
        // onComplete: () => {},
      }
    );
  }
  draw() {
    const p = this.p;
    p.background(0);
    const x = p.width / 2 - (TILE_SIZE * NUMBER_OF_TILES) / 2 + TILE_SIZE / 2; //((NUMBER_OF_TILES * TILE_SIZE) / 2 + TILE_SIZE / 2);
    const y = p.height / 2 - (TILE_SIZE * NUMBER_OF_TILES) / 2 + TILE_SIZE / 2; //((NUMBER_OF_TILES * TILE_SIZE) / 2 + TILE_SIZE / 2);
    for (let i = 0; i < NUMBER_OF_TILES; i++) {
      for (let j = 0; j < NUMBER_OF_TILES; j++) {
        p.push();
        p.translate(x + j * TILE_SIZE, y + i * TILE_SIZE);
        this.matrix.get(i, j).render(p, this.timeline);
        p.pop();
      }
    }
    // p.fill('red').circle(p.width / 2, p.height / 2, 10);
    // p.fill('green').square(p.width / 2, p.height / 2, 5);
  }
}
