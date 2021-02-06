import HydraSketch from './HydraSketch';
import { listInputs, Input } from '@reactive-sketch-easel/midi';
import { OutputBuffer } from './types';
import { SourceData, SystemData } from './Lernie/types';
import * as log from 'loglevel';

const config: SystemData = require('./Lernie/config.json');
const debug = (val: number): number => {
  log.info(val);
  return val;
};
export default class TestSketch extends HydraSketch {
  d = new SystemData();
  input: Input;
  bindOsc(md: SourceData, config: SourceData) {
    this.input.ccBind<SourceData>(config.mod1, 'mod1', md, 0, 80);
    this.input.ccBind<SourceData>(config.mod2, 'mod2', md, -0.5, 0.5);
    this.input.ccBind<SourceData>(config.mod3, 'mod3', md, 0, 10);
    this.input.ccBind<SourceData>(config.rotate, 'rotate', md, -5, 5);
    this.input.ccBind<SourceData>(config.kaleid, 'kaleid', md, 1, 50);
    this.input.ccBind<SourceData>(config.pixelate, 'pixelate', md, 10, 1500);
    this.input.ccBind<SourceData>(config.scale, 'scale', md, 0.5, 10);
    this.input.ccBind<SourceData>(config.colorama, 'colorama', md, 0, 1);
    this.input.ccBind<SourceData>(config.modulate, 'modulate', md, 0, 1);
    this.input.ccBind<SourceData>(config.modulateHue, 'modulateHue', md, 0, 1);
    this.input.ccBind<SourceData>(config.modulateKaleid, 'modulateKaleid', md, 0, 1);
    this.input.ccBind<SourceData>(config.modulateScale, 'modulateScale', md, 0, 1);
    this.input.ccBind<SourceData>(config.blendLevel, 'blendLevel', md, 0, 1);
  }
  setup() {
    Input.create('Launch Control XL').then((i) => {
      this.input = i;
      this.bindOsc(this.d.sources[0], config.sources[0]);
      this.bindOsc(this.d.sources[1], config.sources[1]);
    });
    listInputs();
  }
  runOsc(sourceCreator: any, o: OutputBuffer, sourceData: SourceData, modulationSource: OutputBuffer) {
    // osc(
    //   () => sourceData.mod1,
    //   () => sourceData.mod2,
    //   () => sourceData.mod3
    // )
    sourceCreator()
      .rotate(0, () => sourceData.rotate)
      .kaleid(() => sourceData.kaleid)
      .pixelate(
        () => sourceData.pixelate,
        () => sourceData.pixelate
      )
      .scale(() => sourceData.scale)
      .colorama(() => sourceData.colorama)
      .modulate(src(modulationSource), () => sourceData.modulate)
      // .modulateHue(src(modulationSource), () => sourceData.modulateHue)
      // .modulateKaleid(src(modulationSource), () => sourceData.modulateKaleid)
      .modulateScale(src(modulationSource), () => sourceData.modulateScale)
      .out(o);
  }
  run() {
    s0.initScreen();
    s1.initScreen();
    this.runOsc(() => src(s0), o1, this.d.sources[0], o2);
    this.runOsc(() => src(s1), o2, this.d.sources[1], o1);

    solid(0, 0, 0, 0)
      .blend(src(o1), () => this.d.sources[0].blendLevel)
      .blend(src(o2), () => this.d.sources[1].blendLevel)
      .out();
  }
}
