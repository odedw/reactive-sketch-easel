// let initialized = false;
// const WebMidi: any = window.WebMidi;
// function onEnabled() {
//   // Display available MIDI input devices
//   if (WebMidi.inputs.length < 1) {
//     document.body.innerHTML += 'No device detected.';
//   } else {
//     WebMidi.inputs.forEach((device, index) => {
//       document.body.innerHTML += `${index}: ${device.name} <br>`;
//     });
//   }
// }

// export function initMidi(midiIn: string, midiOut?: string) {
//   WebMidi.enable()
//     .then(onEnabled)
//     .catch((err) => alert(err));

//   // Function triggered when WEBMIDI.js is ready

//   // if (!midi || initialized) return;

//   // initialized = true;
//   // midi.enable().then(() => {
//   //   midi.inputs.forEach((i) => console.log('input', i.name));
//   //   const midiInput = midi.inputs.find((i) => i.name === midiIn);

//   // midiOutput.sendReset();
//   // midiOutput.sendPolyphonicMode('mono', { channels: [1, 2, 3] });
//   // Promise.all([Input.create(MIDI_IN), Output.create(MIDI_OUT)]).then((midis) => {
//   // console.log('adding listener');
//   // midiInput = midis[0];
//   // midiOutput = midis[1];
//   // midiInput?.addListener('noteon', (e) => {
//   //   // console.log  ('note', e);
//   //   if (e.message.channel === 4) {
//   //     if (beat.bars === 1 && beat.current === beat.steps - 1) {
//   //       beat.generate();
//   //     }
//   //     const channels = beat.step();
//   //     const channelToNote = ['C1', 'C#1', 'D1', 'D#1'];
//   //     const notes = channelToNote.filter((_, i) => channels.includes(i));
//   //     midiOutput?.playNote(notes);
//   //     channels.forEach((c) => games[c]?.step());
//   //   } else if (e.message.channel <= games.length) {
//   //     const game = games[e.message.channel - 1];
//   //     game.step();
//   //   }
//   // });
//   // midiInput?.addListener('controlchange', (e) => {
//   //   console.log('controlchange', e);
//   // });

//   // });
// }
