import { Subscription } from 'rxjs';
import { MidiData } from '../types';
import '../../types';

export default abstract class Scene {
  subscriptions: Subscription[] = [];
  abstract load();
  unload() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  abstract render(d: MidiData);
}
