import HydraSketch from './HydraSketch';
import MidiEventEmitter from '../../midi/MidiEventEmitter';
import { MidiData } from './Duck_Cover/types';
import Scene from './Duck_Cover/Scenes/Scene';
import Scene1 from './Duck_Cover/Scenes/Scene1';
import { Scene2 } from './Duck_Cover/Scenes/Scene2';
import Scene3 from './Duck_Cover/Scenes/Scene3';
import Scene4 from './Duck_Cover/Scenes/Scene4';
import SceneTunnel from './Duck_Cover/Scenes/SceneTunnel';
import IntroScene from './Duck_Cover/Scenes/IntroScene';

let d = new MidiData();

export default class Duck_Cover extends HydraSketch {
  scenes = [new Scene1(), new Scene2(), new Scene4(), new Scene3()];
  sceneIndex = -1;
  currentScene: Scene;
  tunnel: SceneTunnel = new SceneTunnel();
  intro = new IntroScene();
  setup() {
    MidiEventEmitter.init();
    MidiEventEmitter.ccBind<MidiData>(51, 'bd', d, 0.05);
    MidiEventEmitter.ccBind<MidiData>(59, 'braids', d, 0.1);
    MidiEventEmitter.ccBind<MidiData>(60, 'tunnelFade', d, 1 / 127);
    MidiEventEmitter.ccBind<MidiData>(61, 'introFade', d, 1 / 127);
    MidiEventEmitter.noteOn('C4').subscribe(() => {
      this.sceneIndex = (this.sceneIndex + 1) % this.scenes.length;
      this.setScene(this.scenes[this.sceneIndex]);
    });

    this.tunnel.load();
    this.intro.load();
  }
  setScene(s: Scene) {
    if (this.currentScene) {
      this.currentScene.unload();
    }
    this.currentScene = s;
    s.load();
    s.render(d);
  }
  run() {
    this.tunnel.render(d);
    this.intro.render(d);
    // src(o2).out();
    src(o1)
      .blend(src(o2), () => d.tunnelFade)
      .blend(src(o3), () => d.introFade)
      .out();
  }
}
