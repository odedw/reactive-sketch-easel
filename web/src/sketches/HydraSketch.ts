import Sketch from './Sketch';
const Hydra = require('hydra-synth');

type OutputBuffer = {};
type SourceBuffer = {};
type Buffer = OutputBuffer | SourceBuffer;
type CallbackObject = {
  time: number;
};
type NumberParameter = number | ((CallbackObject) => number) | number[];
declare global {
  // sources
  const src: (input: Buffer) => any;
  const osc: (frequency?: NumberParameter, sync?: NumberParameter, offset?: NumberParameter) => any;
  const gradient: (speed?: NumberParameter) => any;
  const noise: (scale?: NumberParameter, offset?: NumberParameter) => any;
  const shape: (sides?: NumberParameter, radius?: NumberParameter, smoothing?: NumberParameter) => any;
  const solid: (r?: NumberParameter, g?: NumberParameter, b?: NumberParameter, a?: NumberParameter) => any;
  const voronoi: (scale?: NumberParameter, speed?: NumberParameter, blending?: NumberParameter) => any;

  const render: (buffer?: OutputBuffer) => void;

  // buffers
  const o0: OutputBuffer;
  const o1: OutputBuffer;
  const o2: OutputBuffer;
  const o3: OutputBuffer;
  const s0: SourceBuffer;
  const s1: SourceBuffer;
  const s2: SourceBuffer;
  const s3: SourceBuffer;
}

export default abstract class HydraSketch extends Sketch {
  hydra: any;
  synth: any;
  h: number;
  w: number;
  canvas: HTMLCanvasElement;
  create() {
    super.create();
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'hydra-canvas';
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.container.appendChild(this.canvas);
    this.setup();
    this.hydra = new Hydra({
      canvas: this.canvas,
      // makeGlobal: false,
      //   precision: 'highp',
    });
    this.hydra.setResolution(this.w, this.h);
    this.synth = this.hydra.synth;
    this.run();
  }

  setup() {}
  abstract run();
}
