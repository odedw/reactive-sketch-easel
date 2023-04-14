export class Sequencer {
  steps: number;
  pattern: number[][];
  currentStep = 0;
  onNote: ((channels: number[]) => void) | undefined;
  constructor(
    opts: { steps: number; onNote?: (channels: number[]) => void } = {
      steps: 16,
    }
  ) {
    this.steps = opts.steps;
    this.onNote = opts.onNote;
    this.pattern = new Array(this.steps).fill([]);
  }

  draw() {
    fill(255);
    rect(-width / 2, -height / 2, width, height);
  }

  step() {
    this.currentStep = (this.currentStep + 1) % this.steps;
    if (this.onNote) {
      this.onNote(this.pattern[this.currentStep]);
    }
  }

  reset() {
    this.currentStep = 0;
  }

  mouseClicked(event?: object) {}
}
