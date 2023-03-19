import { Output } from 'rmidi';
import { Game } from './Game';

export const config = [
  {
    board: '1010111001010101111111000111101111111111100101111000100011110111001110111000000010001010010101100110',
    cycle: 6,
    min: 60,
    max: 80,
    topMultiplier: 1.15,
  },

  {
    board: '0001001010011110011001111011110111111011011011110001011001011111111110110101100010011111111010101011',
    cycle: 3,
    min: 70,
    max: 90,
    topMultiplier: 1.15,
  },
  {
    board: '1001000101110101111000111111010001110100001111110010011101011111101100111011110111110111110011011011',
    cycle: 5,
    min: 60,
    max: 90,
    topMultiplier: 1,
  },
];
export function play(val: number, game: Game, channel: number, midiOutput: Output) {
  const c = config[channel - 1];
  if (!c) return;
  if (!c.topMultiplier) c.topMultiplier = random(1, 1.15);

  const mappedVal = floor(
    map(val, 0, game.initialSum * c.topMultiplier, config[channel - 1].min, config[channel - 1].max)
  );
  console.log('play', mappedVal, val, channel, c.topMultiplier);

  midiOutput.midiOutput?.playNote(mappedVal, channel, {
    duration: 200,
  });
}
