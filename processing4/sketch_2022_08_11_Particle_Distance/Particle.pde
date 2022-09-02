public class Particle {
  PVector p,v;
  Particle() {
    p = new PVector(random(0, width), random(0, height));
    v = new PVector(random( -2, 2), random( -2, 2));
  }
  
  void step() {
    p.x += v.x;
    p.y += v.y;
    if (p.x < 0 || p.x > width) v.x *= -1;
    if (p.y < 0 || p.y > height) v.y *= -1;
  }
  
  void draw() {
    noStroke();
    fill(lerpColor(from, to, p.x / width));
    
    circle(p.x, p.y, 4);
  }
}