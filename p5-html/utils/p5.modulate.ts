/// <reference path="../../node_modules/@types/p5/global.d.ts" />
type SINE = 'sine';
type TRIANGLE = 'triangle';
type SAW = 'saw';
type SH = 'SH';
type LFO_TYPE = SINE | TRIANGLE | SH | SAW;
const SINE: SINE = 'sine';
const SH: SH = 'SH';
const TRIANGLE: TRIANGLE = 'triangle';
const SAW: SAW = 'saw';
export class Lfo {
  type: LFO_TYPE;
  frequency: number;
  from: number;
  to: number;
  previousValue: number | null = null;
  previousFrameCount: number = 0;
  phase: number;
  stoppedAt: number = -1;
  stoppedFor: number = -1;
  constructor(type: LFO_TYPE, frequency: number, from: number = -1, to: number = 1, phase: number = 0) {
    this.type = type;
    this.frequency = frequency;
    this.from = from;
    this.to = to;
    this.phase = phase;

    p5.prototype.stepLfo = function () {
      this.step();
    };
    p5.prototype.registerMethod('pre', p5.prototype.stepLfo);
  }

  step() {
    console.log(frameCount);
  }

  stopFor(frames: number) {
    this.stoppedAt = frameCount;
    this.stoppedFor = frames;
  }
  get(): number {
    // if (this.stoppedFor > 0 && frameCount - this.stoppedAt < this.stoppedFor && this.previousValue != null)
    //   return this.previousValue;

    let value = 0;
    if (this.previousFrameCount === frameCount && this.previousValue != null) return this.previousValue;

    if (this.type === SINE) {
      const segment = TWO_PI / this.frequency;
      value = sin(((frameCount + this.phase) % this.frequency) * segment);
    } else if (this.type === SAW) {
      const segment = 1 / this.frequency;
      value = segment * ((frameCount + this.phase) % this.frequency);
    } else if (this.type === SH) {
      value = random(-1, 1);
      // if (frameCount % this.frequency == 0) {
      // } else {
      //   const mapped = map(this.previousValue!, -1, 1, this.from, this.to);
      //   return mapped;
      // }
    }

    this.previousFrameCount = frameCount;
    this.previousValue = value;
    const mapped = map(value, -1, 1, this.from, this.to);
    // console.log(`===========================new value`, frameCount, value, mapped);
    return mapped;
  }
}

export type LfoOptions = {
  from?: number;
  to?: number;
  phase?: number;
};

function createLfo(type: LFO_TYPE, frequency: number, options?: LfoOptions): Lfo {
  return new Lfo(type, frequency, options?.from, options?.to, options?.phase);
}

function createSineLfo(frequency: number, options?: LfoOptions) {
  return createLfo(SINE, frequency, options);
}

function createSawLfo(frequency: number, options?: LfoOptions) {
  return createLfo(SAW, frequency, options);
}

function createSHLfo(frequency: number, options?: LfoOptions) {
  return createLfo(SH, frequency, options);
}

export const Modulate = { createLfo, createSineLfo, createSawLfo, createSHLfo, SINE, SAW };
