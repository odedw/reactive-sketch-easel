import WebMidi, { Output as MidiOutput } from 'webmidi';
import init from './initWebMidi';

export class Output {
  midiOutput?: MidiOutput;
  private constructor(name: string) {
    this.midiOutput = WebMidi.outputs.find((i) => i.name === name);
  }

  static async create(name: string): Promise<Output> {
    await init();
    return new Output(name);
  }

  sendNote() {
    this.midiOutput?.playNote('C4', 1, {
      // duration: 200,
    });
  }

  noteOff() {
    this.midiOutput?.stopNote('C4', 1);
  }
  panic() {
    console.log('===========================');

    this.midiOutput?.sendReset();
    this.midiOutput?.stopNote('C4');
  }
}
