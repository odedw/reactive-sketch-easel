/// <reference path="../node_modules/@types/p5/global.d.ts" />
import { Shader } from 'p5';
import { Modulate } from '../../utils/p5.modulate';
import { Recorder } from '../../utils/Recorder';
import { Game } from './Game';
import { findInitialState, boardToString } from './search';
import { config, play } from './play';
import { Input, Output, WebMidi } from 'webmidi';
import { Beat, generateBeat } from './beat';
// sketch constants3
const MIDI_IN = 'ableton-out'; //'IAC Driver Bus 1';
const MIDI_OUT = 'ableton-in'; //'IAC Driver Bus 2';
const PALETTES = [
  // ['#000000',  '#ff55ff', '#55ffff', , '#ffffff'],
  //['#ffe03d', '#fe4830', '#d33033', '#6d358a', '#1c509e', '#00953c', '#f2f2f2', '#000000', '#ffffff'],
  // ['#FADDE1', '#F8C3CD', '#F6A9B9', '#F390A5', '#F17791', '#EF5E7D', '#ED4569', '#EB2C55', '#E91541'],
  ['#EDF2FB', '#E2E8F0', '#CBD5E0', '#A0AEC0', '#718096', '#4A5568', '#2D3748', '#1A202C', '#171923'],
];
///////////////////

// record
const FPS = 60;
const SHOULD_RECORD = false;
const RECORD_FRAMES = 60;
const OUTPUT_FILENAME = 'square';
//////////////////////

// config
const WIDTH = 1080;
const HEIGHT = 650;
/////////////////////

// locals
let recorder: Recorder;
// let game: Game;
let games: Game[] = [];
let midiInput: Input | undefined;
let midiOutput: Output | undefined;
let theShader: Shader;
let colors: number[][] = [];
let currentPalette = 0;
let current = -1;
let beat = new Beat();
////////////////////

function preload() {
  recorder = new Recorder(SHOULD_RECORD, WIDTH, HEIGHT, FPS, RECORD_FRAMES, OUTPUT_FILENAME);
  // listInputs();
  WebMidi.enable().then(() => {
    midiInput = WebMidi.inputs.find((i) => i.name === MIDI_IN);
    // midiOutput = WebMidi.outputs.find((i) => i.name === MIDI_OUT);
    // if (!midiInput || !midiOutput) {
    //   console.log('no midi');
    //   return;
    // }
    // midiOutput.sendReset();
    // midiOutput.sendPolyphonicMode('mono', { channels: [1, 2, 3] });
    // Promise.all([Input.create(MIDI_IN), Output.create(MIDI_OUT)]).then((midis) => {
    // console.log('adding listener');
    // midiInput = midis[0];
    // midiOutput = midis[1];
    midiInput?.addListener('noteon', (e) => {
      // console.log  ('note', e);
      if (e.message.channel === 4) {
        if (beat.bars === 1 && beat.current === beat.steps - 1) {
          beat.generate();
        }
        const channels = beat.step();
        const channelToNote = ['C1', 'C#1', 'D1', 'D#1'];
        const notes = channelToNote.filter((_, i) => channels.includes(i));
        midiOutput?.playNote(notes);
        channels.forEach((c) => games[c]?.step());
      } else if (e.message.channel <= games.length) {
        const game = games[e.message.channel - 1];
        game.step();
      }
    });
    // midiInput?.addListener('controlchange', (e) => {
    //   if (games.length < e.message.channel) return;
    //   const game = games[e.message.channel - 1];
    //   game.opacity = int(e.value!) / 127;
    // });
  });
  theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  pixelDensity(1);
  frameRate(60);
  noStroke();
  fill(255);
  rectMode(CENTER);
  config.forEach(
    () =>
      games.push(
        new Game(
          random(width * 0.4, width * 0.6),
          random(height * 0.4, height * 0.6),
          random(0.8 * width, 1.2 * width),
          random(0.8 * height, 1.2 * height),
          20,
          20
          // board ?? boardToString(findInitialState(cycle - 1, 10, 10))
        )
      )
    // console.log(i);
  );
  // games.push(new Game(width / 2, height / 2, width, height, 10, 10, boardToString(findInitialState(5, 10, 10))));
  // games.push(new Game(width / 2, height / 2, width, height, 10, 10, boardToString(findInitialState(4, 10, 10))));
}
function onNote(channels: number[]) {
  console.log('squencer note', channels);
}

function draw() {
  // background('#e6e6e6');
  // // games.forEach((g) => frameCount % g.cycle === 0 && g.step());
  // if (frameCount % 60 === 0) games[0].step();
  // if (frameCount % 50 === 0) games[1].step();
  // if (frameCount % 40 === 0) games[2].step();
  // if (frameCount % 120 == 0) currentPalette = (currentPalette + 1) % PALETTES.length;
  games.forEach((g) => g.draw());
  theShader.setUniform('u_texture1', games[0].pg);
  theShader.setUniform('u_texture2', games[1].pg);
  theShader.setUniform('u_texture3', games[2].pg);
  theShader.setUniform('u_time', millis() / 1000.0);
  colors = PALETTES[currentPalette]
    .map((s) => color(s))
    .map((c) => [red(c) / 255.0, green(c) / 255.0, blue(c) / 255.0, 1.0]);
  colors.forEach((c, i) => theShader.setUniform(`u_color${i}`, c));

  shader(theShader);
  rect(-width / 2, -height / 2, width, height);
  resetShader();

  recorder.step();
}

let running = true;
function mouseClicked(event?: object) {
  console.log('frameCount', frameCount);
  // games.forEach((g) => g.step());
  // running = !running;
  // if (!running) noLoop();
  // else loop();
}

function keyPressed(event?: any) {
  if (event.key === ' ') {
    beat.generate();
  }
}

//#region add globals
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
window.keyPressed = keyPressed;

//#endregion
