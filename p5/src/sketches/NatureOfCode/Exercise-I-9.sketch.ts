import Sketch from "../Sketch";

export default class ExerciseI9 extends Sketch {
  zoff: number = 0;
  setup() {
    this.p.createCanvas(this.w, this.h);
    this.p.pixelDensity(1);
  }
  draw() {
    this.p.noiseDetail(4, 0.5);
    this.p.loadPixels();
    let xoff = 0.0;

    for (let x = 0; x < this.w; x++) {
      let yoff = 0.0;

      for (let y = 0; y < this.h; y++) {
        let bright = this.p.int(
          this.p.map(this.p.noise(xoff, yoff, this.zoff), 0, 1, 0, 255)
        );
        this.p.pixels[x * 4 + y * this.w * 4] = bright;
        this.p.pixels[x * 4 + y * this.w * 4 + 1] = bright;
        this.p.pixels[x * 4 + y * this.w * 4 + 2] = bright;
        this.p.pixels[x * 4 + y * this.w * 4 + 3] = 255;
        yoff += 0.01;
      }
      xoff += 0.01;
    }

    this.p.updatePixels();
    this.zoff += 0.05;
  }
}
