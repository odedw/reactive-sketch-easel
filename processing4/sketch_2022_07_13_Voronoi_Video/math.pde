
class Polar{
  float r,a;
  Polar(float _r, float _a) {
    r = _r;
    a = _a;
  }
}

PVector polarToCartesian(float r, float a) {
  return new PVector(cos(a) * r, sin(a) * r);  
}

Polar cartesianToPolar(float x, float y) {
  float r = sqrt(sq(x) + sq(y));
  float a = atan(y / x);
  if (x < 0) {
    a += PI;
  }
  return new Polar(r, a);
}

int clamp(int value, int min, int max) {
  if (value < 0) value = 0;
  if (value > max) value = max;
  return value;
}
