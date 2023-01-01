/// <reference path="../../node_modules/@types/p5/global.d.ts" />
type SINE = 'sine';
type TRIANGLE = 'triangle';
type SAW = 'saw';
type LFO_TYPE = SINE | TRIANGLE | SAW;
const SINE: SINE = 'sine';
const TRIANGLE: TRIANGLE = 'triangle';
const SAW: SAW = 'saw';
export class Lfo {
  type: LFO_TYPE;
  frequency: number;
  from: number;
  to: number;
  phase: number;
  constructor(type: LFO_TYPE, frequency: number, from: number = -1, to: number = 1, phase: number = 0) {
    this.type = type;
    this.frequency = frequency;
    this.from = from;
    this.to = to;
    this.phase = phase;
  }

  get(): number {
    if (this.type === SINE) {
      const segment = TWO_PI / this.frequency;
      const value = sin(((frameCount + this.phase) % this.frequency) * segment);
      const mapped = map(value, -1, 1, this.from, this.to);
      return mapped;
    } else if (this.type === SAW) {
      const segment = 1 / this.frequency;
      const value = segment * ((frameCount + this.phase) % this.frequency);
      const mapped = map(value, -1, 1, this.from, this.to);
      return mapped;
    }
    return 0;
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

export const Modulate = { createLfo, createSineLfo, createSawLfo, SINE, SAW };
