import { Output } from 'webmidi';
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
    board: '0110011010000001110011001101111111101101011110001010101111111110101101111111011000001001111011101111',
    cycle: 4,
    min: 80,
    max: 100,
    topMultiplier: 1,
  },
  {
    board: '1101100000001110000001110111001111011101111001110101111001100111010111011111001101011110101001100101',
    cycle: 6,
    min: 60,
    max: 70,
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
  // console.log('play', mappedVal, val, channel, c.topMultiplier);
  midiOutput.playNote(mappedVal, {
    channels: [channel],
    duration: 10,
    attack: 0.1,
    release: 0.1,
  });
  // midiOutput.playNote(mappedVal, {
  //   channels: [channel],
  //   duration: 10,
  // });
}
