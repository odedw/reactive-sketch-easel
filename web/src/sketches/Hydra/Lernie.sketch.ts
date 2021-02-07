import HydraSketch from './HydraSketch';
import { listInputs, Input } from '@reactive-sketch-easel/midi';
import { OutputBuffer } from './types';
import { SourceData, SystemData } from './Lernie/types';
import * as log from 'loglevel';
import { load, save } from './Lernie/storage';

const config: SystemData = require('./Lernie/config.json');
const debug = (val: number): number => {
  log.info(val);
  return val;
};
export default class TestSketch extends HydraSketch {
  d = new SystemData();
  dataBuffers: SystemData[] = [];

  input: Input;
  bufferInput: Input;
  bindOsc(md: SourceData, config: SourceData) {
    this.input.ccBind<SourceData>(config.mod1, 'mod1', md, 0, 80);
    this.input.ccBind<SourceData>(config.mod2, 'mod2', md, -0.5, 0.5);
    this.input.ccBind<SourceData>(config.mod3, 'mod3', md, 0, 10);
    this.input.ccBind<SourceData>(config.rotate, 'rotate', md, -0.1, 0.1);
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
    //midi
    Input.create('Launch Control XL').then((i) => {
      this.input = i;
      this.bindOsc(this.d.sources[0], config.sources[0]);
      this.bindOsc(this.d.sources[1], config.sources[1]);
    });

    // patch memory
    Input.create('loopMIDI Port').then((i) => {
      this.bufferInput = i;
      this.bufferInput.noteOn(null, 1).subscribe((evt) => {
        log.info(evt.note);
        if (evt.note.number === 60) {
          this.d = this.dataBuffers[0];
          this.run();
        } else if (evt.note.number === 62) {
          this.d = this.dataBuffers[1];
          this.run();
        }
      });
    });
    // listInputs();

    // load
    this.dataBuffers[0] = require('./Lernie/patches/2021-02-06_12_09_46.json');
    this.dataBuffers[1] = require('./Lernie/patches/2021-02-06_12_12_34.json');
    this.d = this.dataBuffers[0];

    // keyboard actions
    document.addEventListener('keydown', (e) => this.keyDown(e));
    // document.getElementById('file-input').addEventListener('change', readSingleFile, false);
  }

  keyDown(e: KeyboardEvent) {
    if (e.code === 'KeyS') {
      save(this.d);
    } else if (e.code === 'KeyL') {
      load();
    }
  }
  runOsc(o: OutputBuffer, sourceData: SourceData, modulationSource: OutputBuffer) {
    osc(
      () => sourceData.mod1,
      () => sourceData.mod2,
      () => sourceData.mod3
    )
      .rotate(() => {
        sourceData.angle += sourceData.rotate;
        if (sourceData.angle > Math.PI) {
          sourceData.angle -= Math.PI * 2;
        }
        return sourceData.angle;
      }, 0)
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
    this.runOsc(o1, this.d.sources[0], o2);
    this.runOsc(o2, this.d.sources[1], o1);

    solid(0, 0, 0, 0)
      .blend(src(o1), () => this.d.sources[0].blendLevel)
      .blend(src(o2), () => this.d.sources[1].blendLevel)
      .out();
  }
}
