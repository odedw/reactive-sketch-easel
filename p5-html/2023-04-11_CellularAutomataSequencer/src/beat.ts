const STEPS = 16;

export function generateBeat() {
  let b: boolean[][] = [[true], [false], [false], [true]];

  for (let i = 0; i < STEPS - 1; i++) {
    const val = Math.random();
    b[0].push(0.5 < val && val < 0.75);
    b[1].push(0.75 < val && val < 1);
    b[2].push(0 < val && val < 0.5 && Math.random() < 0.85);
    b[3].push(false);
  }

  return b;
}
