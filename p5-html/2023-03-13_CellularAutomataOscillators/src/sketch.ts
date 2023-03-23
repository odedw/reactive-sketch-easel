/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Shader } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { Game } from './Game';
import { findInitialState, boardToString } from './search';
import { config, play } from './play';
import { Input, Output, WebMidi } from 'webmidi';
// sketch constants
const MIDI_IN = 'ableton-out'; //'IAC Driver Bus 1';
const MIDI_OUT = 'ableton-in'; //'IAC Driver Bus 2';
///////////////////

// record
const FPS = 60;
const SHOULD_RECORD = false;
const RECORD_FRAMES = 60;
const OUTPUT_FILENAME = 'square';
//////////////////////

// config
const WIDTH = 540;
const HEIGHT = 540;
/////////////////////

// locals
let recorder: Recorder;
// let game: Game;
let games: Game[] = [];
let midiInput: Input | undefined;
let midiOutput: Output | undefined;
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  // listInputs();
  WebMidi.enable().then(() => {
    midiInput = WebMidi.inputs.find((i) => i.name === MIDI_IN);
    midiOutput = WebMidi.outputs.find((i) => i.name === MIDI_OUT);
    if (!midiInput || !midiOutput) {
      console.log('no midi');
      return;
    }
    midiOutput.sendReset();
    // Promise.all([Input.create(MIDI_IN), Output.create(MIDI_OUT)]).then((midis) => {
    // console.log('midis', midis);
    // midiInput = midis[0];
    // midiOutput = midis[1];
    midiInput?.addListener('noteon', (e) => {
      console.log('note', e);
      if (games.length < e.message.channel) return;
      const game = games[e.message.channel - 1];
      const sum = game.step();
      play(sum, game, e.message.channel, midiOutput!);
    });
    // midiInput?.addListener('controlchange', (e) => {
    //   if (games.length < e.message.channel) return;
    //   const game = games[e.message.channel - 1];
    //   game.opacity = int(e.value!) / 127;
    // });
    // });
  });
}

function setup() {
  createCanvas(WIDTH, HEIGHT /*, WEGL*/);
  pixelDensity(2);
  frameRate(60);
  noStroke();
  fill(255);
  rectMode(CENTER);
  config.forEach(
    ({ cycle, board }) =>
      games.push(
        new Game(
          random(width * 0.4, width * 0.6),
          random(height * 0.4, height * 0.6),
          random(0.8 * width, 1.2 * width),
          random(0.8 * height, 1.2 * height),
          10,
          10,
          board ?? boardToString(findInitialState(cycle - 1, 10, 10))
        )
      )
    // console.log(i);
  );

  // games.push(new Game(width / 2, height / 2, width, height, 10, 10, boardToString(findInitialState(5, 10, 10))));
  // games.push(new Game(width / 2, height / 2, width, height, 10, 10, boardToString(findInitialState(4, 10, 10))));
}

function draw() {
  background('#e6e6e6');
  // games.forEach((g) => frameCount % g.cycle === 0 && g.step());
  // games.forEach((g) => frameCount % 60 === 0 && g.step());
  games.forEach((g) => g.draw());
  recorder.step();
}

let running = true;
function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  // games.forEach((g) => g.step());
  running = !running;
  if (!running) noLoop();
  else loop();
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;

//#endregion
