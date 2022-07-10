public class Strand {
  int d, s;
  PVector p, prev;
  float a;
  color c;
  Strand(int x_, int y_, float angle,color c_, int stepSize) {
    p = new PVector(x_, y_);
    a = angle;
    // d = direction;
    c = c_;
    s = stepSize;
  }
  
  void draw() {
    prev = p;
    PVector newP = polarToCartesian(s, a);
    p.x = newP.x + p.x;
    p.y = newP.y + p.y;
    stroke(c);
    line(prev.x, prev.y, p.x, p.y);
  }
}