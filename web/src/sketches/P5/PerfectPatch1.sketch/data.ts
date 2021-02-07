import { Vector } from 'p5';

export const randomBoolean = () => Math.random() > 0.5;

export class MidiData {
  bd: number = 0;
  bass: number = 0;
}

export type Variation = {
  locations: Vector[];
  size: number;
  take: number[];
};
export const variations: Variation[] = [
  {
    locations: [
      new Vector().set(0.35, 0.25),
      new Vector().set(0.65, 0.75),
      new Vector().set(0.65, 0.25),
      new Vector().set(0.35, 0.75),
    ],
    size: 200,
    take: [1, 1, 1, 1],
  },
  {
    locations: [
      new Vector().set(0.2, 0.25),
      new Vector().set(0.4, 0.25),
      new Vector().set(0.6, 0.25),
      new Vector().set(0.8, 0.25),
      new Vector().set(0.2, 0.75),
      new Vector().set(0.4, 0.75),
      new Vector().set(0.6, 0.75),
      new Vector().set(0.8, 0.75),
    ],
    size: 150,
    take: [2, 2, 2, 2],
  },
  {
    locations: [
      new Vector().set(0.3, 0.2),
      new Vector().set(0.5, 0.2),
      new Vector().set(0.7, 0.2),
      new Vector().set(0.3, 0.5),
      new Vector().set(0.5, 0.5),
      new Vector().set(0.7, 0.5),
      new Vector().set(0.3, 0.8),
      new Vector().set(0.5, 0.8),
      new Vector().set(0.7, 0.8),
    ],
    size: 150,
    take: [2, 2, 2, 3],
  },
];

const colorPairs = [
  ['#E5DADA', '#E59500'],
  ['#E5DADA', '#B54B19'],
  ['#E5DADA', '#840032'],
  ['#E5DADA', '#002642'],
];

export class Palette {
  b: string;
  f: string;
  constructor(b: string, f: string) {
    this.b = b;
    this.f = f;
  }
  switch() {
    const f = this.f;
    this.f = this.b;
    this.b = f;
  }
}
export const randomPalette = (): Palette => {
  const pair = colorPairs.random().randomize();
  return new Palette(pair[0], pair[1]);
};
