import HydraSketch from './HydraSketch';

export default class TestSketch extends HydraSketch {
  setup() {}
  run() {
    s0.initScreen();
    src(s0)
      .rotate([Math.PI / 4, Math.PI / 2, (Math.PI * 3) / 4, Math.PI].fast(0.5))
      .repeat(4)

      .scale([1, 1.5].fast(0.1))
      .thresh(0.4, 0.4)
      .colorama(({ time }) => Math.sin(time / 20))

      .saturate([1, 0.9, 0.8, 0.7].fast(0.2))
      .pixelate([750, 650, 500], [750, 850])
      .out();
  }
}
