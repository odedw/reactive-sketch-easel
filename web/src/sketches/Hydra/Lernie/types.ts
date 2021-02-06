export class SourceData {
  blendLevel: number;
  mod1: number;
  mod2: number;
  mod3: number;
  rotate: number;
  angle: number = 0;
  kaleid: number;
  pixelate: number;
  scale: number;
  colorama: number;
  modulate: number;
  modulateHue: number;
  modulateKaleid: number;
  modulateScale: number;

  constructor() {
    this.mod1 = 60;
    this.blendLevel = 0;
    this.mod2 = 0;
    this.mod3 = 0;
    this.rotate = 0;
    this.kaleid = 1;
    this.pixelate = 1500;
    this.scale = 1;
    this.colorama = 0;
    this.modulate = 0;
    this.modulateHue = 0;
    this.modulateKaleid = 0;
    this.modulateScale = 0;
  }
}

export class SystemData {
  sources: SourceData[];
  constructor() {
    this.sources = [new SourceData(), new SourceData()];
  }
}
