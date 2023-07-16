export class Beat {
  steps = 16;
  beat: boolean[][] = [];
  bars: number = -1;
  current: number = -1;
  constructor() {
    this.generate();
  }

  generate() {
    this.beat = [[true], [false], [false], [true]];
    this.bars = -1;
    this.current = -1;
    for (let i = 0; i < this.steps - 1; i++) {
      const val = Math.random();
      this.beat[0].push(0.5 < val && val < 0.75);
      this.beat[1].push(0.75 < val && val < 1);
      this.beat[2].push(0 < val && val < 0.5 && Math.random() < 0.85);
      this.beat[3].push(false);
    }
  }

  step() {
    this.current = (this.current + 1) % this.steps;
    if (this.current === 0) {
      this.bars++;
    }

    const channels = [];
    for (let i = 0; i < this.beat.length; i++) {
      if (this.beat[i][this.current]) {
        channels.push(i);
      }
    }

    // console.log(this.current, this.bars);
    return channels;
  }
}
