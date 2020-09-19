import WebMidi, { InputEventNoteon, IMidiChannel, InputEventControlchange, InputEventClock } from 'webmidi';
import { EventSubjectRepository } from './EventSubjectRepository';
import { Observable, Subscription } from 'rxjs';
import { filter, bufferCount, pairwise, map } from 'rxjs/operators';
import { isMatch } from './MidiUtils';
import * as log from 'loglevel';

export default class MidiEventEmitter {
  static NOTE_ON_EVENT = 'MidiEventEmitter.NOTE_ON_EVENT';
  static CONTROL_CHANGE_EVENT = 'MidiEventEmitter.CONTROL_CHANGE_EVENT';
  static CLOCK_EVENT = 'MidiEventEmitter.CLOCK_EVENT';

  static init(): Promise<void> {
    return new Promise((resolve, reject) => {
      WebMidi.enable((err) => {
        if (err) reject(err);

        // list inputs
        WebMidi.inputs.forEach((i) => log.info(i.name));

        const midiInput = WebMidi.inputs.find(
          (i) => i.name === 'Arturia KeyStep 32'
          // (i) => i.name === 'loopMIDI Port'
        );
        if (!midiInput) return;

        midiInput.addListener('noteon', 'all', (e) => {
          log.debug(`channel: ${e.channel}, note: ${e.note.name}${e.note.octave}`);
          EventSubjectRepository.subjectFor<InputEventNoteon>(MidiEventEmitter.NOTE_ON_EVENT).next(e);
        });
        midiInput.addListener('controlchange', 'all', (e) => {
          EventSubjectRepository.subjectFor<InputEventControlchange>(MidiEventEmitter.CONTROL_CHANGE_EVENT).next(e);
        });

        midiInput.addListener('clock', 'all', (e) => {
          EventSubjectRepository.subjectFor<InputEventClock>(MidiEventEmitter.CLOCK_EVENT).next(e);
        });
      });
      resolve();
    });
  }

  static noteOn(note: string = '', channel: IMidiChannel = 'all'): Observable<InputEventNoteon> {
    return EventSubjectRepository.subjectFor<InputEventNoteon>(MidiEventEmitter.NOTE_ON_EVENT).pipe(
      filter((e) => isMatch(e, note, channel))
    );
  }

  static cc(ccNumber: number, channel: IMidiChannel = 'all'): Observable<InputEventControlchange> {
    return EventSubjectRepository.subjectFor<InputEventControlchange>(MidiEventEmitter.CONTROL_CHANGE_EVENT).pipe(
      filter((e) => {
        return (channel === 'all' || e.channel === channel) && e.controller.number === ccNumber;
      })
    );
  }

  static ccTriger(ccNumber: number, threshold: number = 1, channel: IMidiChannel = 'all'): Observable<boolean> {
    return EventSubjectRepository.subjectFor<InputEventControlchange>(MidiEventEmitter.CONTROL_CHANGE_EVENT).pipe(
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

  static ccBind<T>(
    ccNumber: number,
    key: keyof T,
    t: T,
    factor: number = 1,
    channel: IMidiChannel = 'all'
  ): Subscription {
    return MidiEventEmitter.cc(ccNumber, channel).subscribe((e) => {
      // log.info(`${key} = ${e.value}`);
      //@ts-ignore
      t[key] = e.value * factor;
    });
  }

  static clock(division: number = 1): Observable<InputEventClock[]> {
    return EventSubjectRepository.subjectFor<InputEventClock>(MidiEventEmitter.CLOCK_EVENT).pipe(bufferCount(division));
  }
}
