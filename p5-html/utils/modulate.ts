/// <reference path="../node_modules/@types/p5/global.d.ts" />

type SINE = 'sine';
type TRIANGLE = 'triangle';
type LFO_TYPE = SINE | TRIANGLE;
const SINE: SINE = 'sine';
const TRIANGLE: TRIANGLE = 'triangle';

class Lfo {
  type: LFO_TYPE;
  frequency: number;
  lower: number;
  upper: number;
  constructor(type: LFO_TYPE, frequency: number, lower: number = -1, upper: number = 1) {
    this.type = type;
    this.frequency = frequency;
    this.lower = lower;
    this.upper = upper;
  }

  get(): number {
    const segment = TWO_PI / this.frequency;
    const value = sin((frameCount % this.frequency) * segment);
    const mapped = map(value, -1, 1, this.lower, this.upper);
    return mapped;
  }
}

function createLfo(type: LFO_TYPE, frequency: number, lower: number, upper: number): Lfo {
  return new Lfo(type, frequency, lower, upper);
}

export const Modulate = { createLfo, SINE, TRIANGLE };
