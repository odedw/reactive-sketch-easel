import { Vector } from 'p5';

export class MidiData {
  bd: number = 0;
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
