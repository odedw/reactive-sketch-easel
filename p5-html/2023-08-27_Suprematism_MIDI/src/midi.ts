import { WebMidi } from 'webmidi';
import { ControlChangeMessageEvent, Input as MidiInput, NoteMessageEvent } from 'webmidi';
let initialized = false;
export function init(): Promise<void> {
  return initialized
    ? Promise.resolve()
    : new Promise((resolve, reject) => {
        WebMidi.enable({
          callback: (err: any) => {
            if (err) reject(err);
            else {
              initialized = true;
              resolve();
            }
          },
        });
      });
}

export function listOutputs() {
  init().then(() => {
    WebMidi.outputs.forEach((output) => console.log(output.name));
  });
}

export function listInputs() {
  init().then(() => {
    WebMidi.inputs.forEach((inputs) => console.log(inputs.name));
  });
}

export class Input {
  midiInput: MidiInput | undefined;

  constructor(name: string) {
    const i = WebMidi.inputs.find((i) => i.name === name) as MidiInput;

    if (!i) {
      // log.error(`MIDI input '${name}' was not found`);
      return;
    }

    this.midiInput = i;
  }
}
