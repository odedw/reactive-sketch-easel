import HydraSketch from './HydraSketch';
import MidiEventEmitter from '../../midi/MidiEventEmitter';
import { MidiData } from './Duck_Cover/types';
import Scene from './Duck_Cover/Scene';
import Scene1 from './Duck_Cover/Scene1';
import { Scene2 } from './Duck_Cover/Scene2';

let d = new MidiData();

export default class Duck_Cover extends HydraSketch {
  scenes = [new Scene1(), new Scene2()];
  sceneIndex = -1;
  currentScene: Scene;
  setup() {
    MidiEventEmitter.init();
    MidiEventEmitter.ccBind<MidiData>(51, 'bd', d, 0.05);
    MidiEventEmitter.ccBind<MidiData>(59, 'braids', d, 0.1);
    MidiEventEmitter.noteOn('C4').subscribe(() => {
      this.sceneIndex = (this.sceneIndex + 1) % this.scenes.length;
      this.setScene(this.scenes[this.sceneIndex]);
    });
  }
  setScene(s: Scene) {
    if (this.currentScene) {
      this.currentScene.unload();
    }
    this.currentScene = s;
    s.load();
    s.render(d);
  }
  run() {}
}
