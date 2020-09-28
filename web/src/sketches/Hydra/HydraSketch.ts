import Sketch from '../Sketch';
const Hydra = require('hydra-synth');

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
