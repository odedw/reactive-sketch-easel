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
  contrast: (amount?: NumberParameter) => HydraStream;
  luma: (threshold?: NumberParameter, tolerance?: NumberParameter) => HydraStream;
  invert: (amount?: NumberParameter) => HydraStream;
  brightness: (amount?: NumberParameter) => HydraStream;
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
  modulatePixelate: (texture: HydraStream, multiple?: NumberParameter, offset?: NumberParameter) => HydraStream;
  modulateKaleid: (texture: HydraStream, nSides: NumberParameter) => HydraStream;

  // Operators
  add: (texture: HydraStream, amount?: NumberParameter) => HydraStream;
  blend: (texture: HydraStream, amount?: NumberParameter) => HydraStream;

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
