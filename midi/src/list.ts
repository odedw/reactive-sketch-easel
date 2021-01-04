import init from './initWebMidi';
import WebMidi from 'webmidi';

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
