import MidiEventEmitter from '../../midi/MidiEventEmitter';
import HydraSketch from './HydraSketch';
// import MidiEventEmitter from '../../midi/MidiEventEmitter';

class MidiData {
  bd = 0;
  bass = 0;
  padFader = 0;
  bassFader = 0;
  drumsFader = 0;
}
export default class HydraMidiShowcase extends HydraSketch {
  d = new MidiData();
  corners = 5;
  rotation = 1;
  noise = 0.01;
  setup() {
    MidiEventEmitter.init();
    MidiEventEmitter.ccBind<MidiData>(15, 'bd', this.d, 1 / 127);
    MidiEventEmitter.ccBind<MidiData>(16, 'drumsFader', this.d, 1 / 127);
    MidiEventEmitter.ccBind<MidiData>(17, 'bass', this.d, 1 / 30);
    MidiEventEmitter.ccBind<MidiData>(18, 'bassFader', this.d, 1 / 127);
    MidiEventEmitter.ccBind<MidiData>(20, 'padFader', this.d, 1 / 127);
    MidiEventEmitter.ccTriger(15, 5).subscribe(() => {
      this.rotation *= -1;
      this.corners = ((this.corners - 4) % 4) + 5;
      this.noise = 0.01 - this.noise;
    });
  }
  run() {
    shape(() => this.corners, 0.3, 0)
      .scale(1.5, 1, 1.5)
      .rotate(({ time }) => time)
      .repeat()

      .color(
        ({ time }) => Math.sin(time / 10),
        ({ time }) => Math.cos(time / 10),
        ({ time }) => Math.tan(time / 10)
      )
      .contrast(({ time }) => Math.sin(time) * 5)
      .modulate(noise(100), () => this.noise)
      .out(o1);

    voronoi(50)
      .scale(1, 1, 1.5)
      .colorama(({ time }) => Math.sin(time / 10))
      //   .color(
      //     () => 1 + this.d.bass,
      //     () => 1 + this.d.bass,
      //     () => 1 + this.d.bass
      //   )
      .out(o2);

    osc(50, 0.01, 1)
      .blend(osc(50, -0.01, 1), 0.5)
      .blend(osc(50, 0.01, 1).rotate(Math.PI / 2))
      .blend(osc(50, 0.01, 1).rotate((Math.PI * 3) / 2))
      .rotate(({ time }) => time / 10)
      .out(o3);

    solid(0, 0, 0)
      .blend(src(o1), () => this.d.drumsFader)
      .blend(src(o2), () => this.d.bassFader)
      .blend(src(o3), () => this.d.padFader)
      .pixelate(400, 400)

      .out();
  }
}
