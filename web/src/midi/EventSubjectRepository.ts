import { Subject } from 'rxjs';
import * as log from 'loglevel';

export class EventSubjectRepository {
  private static subjects: { [key: string]: any } = {};
  static subjectFor<T>(key: string): Subject<T> {
    if (!EventSubjectRepository.subjects[key]) {
      const subject = new Subject<T>();
      subject.subscribe((t) => {
        log.debug(`New ${key} event`);
      });
      EventSubjectRepository.subjects[key] = subject;
    }

    return EventSubjectRepository.subjects[key];
  }
}
