import { Subscription } from 'rxjs';
import { MidiData } from './types';

export default abstract class Scene {
  subscriptions: Subscription[] = [];
  abstract render(d: MidiData);
  abstract load();
  unload() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
