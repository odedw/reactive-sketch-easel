export type OutputBuffer = {};
export type SourceBuffer = {
  initCam: (index?: number) => void;
  initScreen: () => void;
};
export type Buffer = OutputBuffer | SourceBuffer;
export type CallbackObject = {
  time: number;
};
export type NumberParameter = number | ((CallbackObject) => number) | number[];
export type HydraStream = {
  // Color
  /**
   * @param amount default 1.6
   */
  contrast: (amount?: NumberParameter) => HydraStream;
  /**
   * @param {NumberParameter} threshold default 0.5
   * @param {NumberParameter} tolerance default 0.1
   */
  luma: (threshold?: NumberParameter, tolerance?: NumberParameter) => HydraStream;
  /**
   * @param {NumberParameter} amount default 1.0
   */
  invert: (amount?: NumberParameter) => HydraStream;
  /**
   * @param {NumberParameter} amount default 0.4
   */
  brightness: (amount?: NumberParameter) => HydraStream;
  /**
   * Colorize texture. Values between 0-1.
   */
  color: (r: NumberParameter, g: NumberParameter, b: NumberParameter) => HydraStream;
  /**
   * @param {NumberParameter} bins default 3.0
   * @param {NumberParameter} gamma default 0.6
   */
  posterize: (bins?: NumberParameter, gamma?: NumberParameter) => HydraStream;
  /**
   * Shift HSV values.
   * @param {NumberParameter} amount default 0.005
   */
  colorama: (amount?: NumberParameter) => HydraStream;
  /**
   * @param {NumberParameter} amount default 2.0
   */
  saturate: (amount?: NumberParameter) => HydraStream;
  /**
   * @param {NumberParameter} r default 0.5
   * @param {NumberParameter} g default 0.5
   * @param {NumberParameter} b default 0.5
   * @param {NumberParameter} a default 0.5
   */
  shift: (r?: NumberParameter, g?: NumberParameter, b?: NumberParameter, a?: NumberParameter) => HydraStream;
  /**
   * @param {NumberParameter} threshold default 0.5
   * @param {NumberParameter} tolerance default 0.04
   */
  thresh: (threshold?: NumberParameter, tolerance?: NumberParameter) => HydraStream;

  // Geometry
  scale: (size?: NumberParameter, xMult?: NumberParameter, yMult?: NumberParameter) => HydraStream;
  kaleid: (nSides?: NumberParameter) => HydraStream;
  pixelate: (x?: NumberParameter, y?: NumberParameter) => HydraStream;
  repeat: (
    repeatX?: NumberParameter,
    repeatY?: NumberParameter,
    offsetX?: NumberParameter,
    offsetY?: NumberParameter
  ) => HydraStream;
  repeatX: (reps?: NumberParameter, offset?: NumberParameter) => HydraStream;
  repeatY: (reps?: NumberParameter, offset?: NumberParameter) => HydraStream;
  rotate: (angle?: NumberParameter, speed?: NumberParameter) => HydraStream;
  scrollX: (scrollX?: NumberParameter, speed?: NumberParameter) => HydraStream;
  scrollY: (scrollY?: NumberParameter, speed?: NumberParameter) => HydraStream;

  // Modulators
  /**
   * @param {NumberParameter} amount default 0.1
   */
  modulate: (texture: HydraStream, amount?: NumberParameter) => HydraStream;
  modulatePixelate: (texture: HydraStream, multiple?: NumberParameter, offset?: NumberParameter) => HydraStream;
  modulateKaleid: (texture: HydraStream, nSides: NumberParameter) => HydraStream;
  modulateScale: (texture: HydraStream, multiple?: NumberParameter, offset?: NumberParameter) => HydraStream;
  modulateRepeat: (texture: HydraStream, repeatX?: NumberParameter, repeatY?: NumberParameter, offsetX?: NumberParameter, offsetY?: NumberParameter ) => HydraStream;

  // Operators
  add: (texture: HydraStream, amount?: NumberParameter) => HydraStream;
  blend: (texture: HydraStream, amount?: NumberParameter) => HydraStream;
  diff: (texture: HydraStream, amount?: NumberParameter) => HydraStream;

  // Out
  out: (buffer?: OutputBuffer) => void;
};

declare global {
  // sources
  const src: (input: Buffer) => HydraStream;
  const osc: (frequency?: NumberParameter, sync?: NumberParameter, offset?: NumberParameter) => HydraStream;
  const gradient: (speed?: NumberParameter) => HydraStream;
  /**
   * Generate Perlin noise.
   * @param {NumberParameter} scale default value
   */
  const noise: (scale?: NumberParameter, offset?: NumberParameter) => HydraStream;
  const shape: (sides?: NumberParameter, radius?: NumberParameter, smoothing?: NumberParameter) => HydraStream;
  const solid: (r?: NumberParameter, g?: NumberParameter, b?: NumberParameter, a?: NumberParameter) => HydraStream;
  const voronoi: (scale?: NumberParameter, speed?: NumberParameter, blending?: NumberParameter) => HydraStream;

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
