class Particle{
  PVector pos, vel, acc;
  float m;
  Particle(float x, float y, float _m) {
    pos = new PVector(x, y);
    vel = new PVector(); 
    acc = new PVector();
    m = _m;
  }
  
  void step() {
    vel.add(acc);
    vel.limit(vLimit);
    pos.add(vel);
    // pos.x = constrain(pos.x, 0, width);
    // pos.y = constrain(pos.y, 0, height);
    acc.mult(0);
  }
  
  
  void draw() {
    stroke(255);
    strokeWeight(2);
    fill(0,0,0,0);
    circle(pos.x, pos.y, m);
  }
  
  void applyForce(PVector p, float _m) {
    applyForce(p, _m, 50);
  }
  void applyForce(PVector p, float _m, float closenessMult) {
    PVector force = PVector.sub(p, pos);
    float d = force.mag();
    d = constrain(d, 1, 100);
    float G = 10;
    float strength = _m * G / (d * d);
    force.setMag(strength);
    // if ((frameCount / 120) % 2 == 1) 
    force.mult( -1);
    if (d < m + _m + 4) {
      force.mult(closenessMult);
    }
    acc.add(force);
  }
}