export class Polar {
  r: number;
  a: number;
  constructor(r: number, a: number) {
    this.r = r;
    this.a = a;
  }
}

export function polarToCartesian(r: number, a: number) {
  return {
    x: cos(a) * r,
    y: sin(a) * r,
  };
}

export function cartesianToPolar(x: number, y: number) {
  const r = sqrt(sq(x) + sq(y));
  let a = atan(y / x);
  if (x < 0) {
    a += PI;
  }
  return new Polar(r, a);
}

export function clamp(value: number, min: number, max: number) {
  if (value < min) value = min;
  if (value > max) value = max;
  return value;
}
