let subscriptions = {};
let midiInitialized = false;
function bindParameterToMidi(attenuators, propName, min, max, controller, options = {}) {
  if (!midiInitialized) {
    initMidi();
    midiInitialized = true;
  }
  subscriptions[controller] = (v) => {
    attenuators[propName] = map(v, 0, 1, min, max);
    if (options.floor) attenuators[propName] = floor(attenuators[propName]);
    console.log(propName, attenuators[propName], v);
  };
}

function spikeParameterOnNoteOn(attenuators, propName, increaseBy, ms, note) {
  if (!midiInitialized) {
    initMidi();
    midiInitialized = true;
  }
  subscriptions[note] = () => {
    const prev = attenuators[propName];
    attenuators[propName] += increaseBy;
    setTimeout(() => {
      attenuators[propName] = prev;
    }, ms);
  };
}

function initMidi() {
  WebMidi.enable()
    .then(onEnabled)
    .catch((err) => alert(err));

  function onEnabled() {
    if (WebMidi.inputs.length < 1) {
      console.log('MIDI - No device detected.');
    } else {
      console.log('======== MIDI Inputs:');
      WebMidi.inputs.forEach((device, index) => {
        console.log(device.name);
      });
      console.log('====================');

      const myInput = WebMidi.getInputByName('Launch Control XL');
      myInput.addListener('controlchange', (e) => {
        if (!subscriptions[e.controller.number]) {
          console.log(e.controller.number, e.value);
        } else {
          subscriptions[e.controller.number](e.value);
        }
      });
      myInput.addListener('noteon', (e) => {
        const noteName = `${e.note.name}${e.note.octave}`;
        if (!subscriptions[noteName]) {
          console.log(`noteon: ${noteName}`);
        } else {
          subscriptions[noteName]();
        }
      });
    }
  }
}
