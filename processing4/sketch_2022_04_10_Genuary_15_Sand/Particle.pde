class Particle{
  PVector v, a, p;
  color c;
  boolean stuck;
  Particle(float x, float y) {
    p = new PVector(x,y);
    c = colors[int(random(colors.length))];
    v = new PVector(); 
    a = new PVector();
  }
  
  void step() {
    if (stuck) {
      return;
    }
    v.add(a);
    v.limit(vLimit);
    p.add(v);
    a.mult(0);
    if (p.x < width && p.x > 0 && p.y < height && p.y >=  0) {
      // Pixel px = pixels[int(p.y)][int(p.x)];
      // println("px: " + px);
      if (!stuckPixels[int(p.x)][int(p.y)]) {
        stuck = random(10) < pixels[int(p.x)][int(p.y)].brightness / 255.0;
        if (stuck) {
          stuckPixels[int(p.x)][int(p.y)] = true;
        }
      }
    }
  }
  
  void draw() {
    // strokeWeight(2);
    // stroke(c);
    noStroke();
    fill(c);
    // point(p.x, p.y);
    circle(p.x, p.y, 2);
  }
  
  void apply(PVector _p) {
    PVector force = PVector.sub(_p, p);
    float d = force.mag();
    d = constrain(d, 1, 100);
    float G = 500;
    float strength = G / (d * d);
    force.setMag(strength);
    force.mult( -1);
    a.add(force);
    println("a: " + a);
  }
}
