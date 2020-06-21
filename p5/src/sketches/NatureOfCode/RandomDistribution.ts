import Sketch from "../Sketch";

export class RandomDistribution extends Sketch {
  backgroundColor = 255;
  randomCounts: number[] = new Array(20).fill(0);

  setup() {
    this.p.createCanvas(this.w, this.h);
  }
  draw() {
    this.p.background(255);
    const index = this.p.round(this.p.random(this.randomCounts.length - 1));
    this.randomCounts[index]++;
    this.p.stroke(0);
    this.p.fill(175);
    const w = this.w / this.randomCounts.length;

    // Graphing the results

    for (let x = 0; x < this.randomCounts.length; x++) {
      this.p.rect(
        x * w,
        this.h - this.randomCounts[x],
        w - 1,
        this.randomCounts[x]
      );
    }
  }
}
