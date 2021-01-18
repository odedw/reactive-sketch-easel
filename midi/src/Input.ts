import init from './initWebMidi';
import * as log from 'loglevel';
import WebMidi, {
  Input as MidiInput,
  InputEventNoteon,
  IMidiChannel,
  InputEventControlchange,
  InputEventClock,
} from 'webmidi';
import { Observable, Subscription, Subject } from 'rxjs';
import { filter, bufferCount, pairwise, map } from 'rxjs/operators';
import { isMatch } from './MidiUtils';

export class Input {
  midiInput: MidiInput | undefined;
  private subjects = {
    noteOn: new Subject<InputEventNoteon>(),
    cc: new Subject<InputEventControlchange>(),
    clock: new Subject<InputEventClock>(),
  };

  constructor(name: string) {
    const i = WebMidi.inputs.find((i) => i.name === name) as MidiInput;

    if (!i) {
      log.error(`MIDI input '${name}' was not found`);
      return;
    }

    this.midiInput = i;
    this.midiInput.addListener('noteon', 'all', (e) => {
      log.debug(`channel: ${e.channel}, note: ${e.note.name}${e.note.octave}`);
      this.subjects.noteOn.next(e);
    });
    this.midiInput.addListener('controlchange', 'all', (e) => {
      this.subjects.cc.next(e);
    });

    this.midiInput.addListener('clock', 'all', (e) => {
      this.subjects.clock.next(e);
    });
  }
  static async create(name: string): Promise<Input> {
    await init();
    return new Input(name);
  }

  noteOn(note: string = '', channel: IMidiChannel = 'all'): Observable<InputEventNoteon> {
    return this.subjects.noteOn.pipe(filter((e) => isMatch(e, note, channel)));
  }

  cc(ccNumber: number, channel: IMidiChannel = 'all'): Observable<InputEventControlchange> {
    return this.subjects.cc.pipe(
      filter((e) => {
        return (channel === 'all' || e.channel === channel) && e.controller.number === ccNumber;
      })
    );
  }

  ccTriger(ccNumber: number, threshold: number = 1, channel: IMidiChannel = 'all'): Observable<boolean> {
    return this.subjects.cc.pipe(
      filter((e) => {
        return (channel === 'all' || e.channel === channel) && e.controller.number === ccNumber;
      }),
      pairwise(),
      filter((pair) => {
        return pair[0].value < threshold && pair[1].value >= threshold;
      }),
      map(() => true)
    );
  }

  ccBind<T>(ccNumber: number, key: keyof T, t: T, factor: number = 1, channel: IMidiChannel = 'all'): Subscription {
    return this.cc(ccNumber, channel).subscribe((e) => {
      // log.info(`${key} = ${e.value}`);
      //@ts-ignore
      t[key] = e.value * factor;
    });
  }

  clock(division: number = 1): Observable<InputEventClock[]> {
    return this.subjects.clock.pipe(bufferCount(division));
  }
}
