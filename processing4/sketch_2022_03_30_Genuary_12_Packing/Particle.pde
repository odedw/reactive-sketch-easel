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
    acc.mult(0);
    float d = dist(pos.x, pos.y, width / 2, height / 2);
    // checkCollisions();
    
    if (d - 2 > r - m / 2) {
      // println("out");
      Polar p = cartesianToPolar(pos.x - width / 2, pos.y - height / 2);
      PVector newPos = polarToCartesian(r - m / 2, p.a);
      pos.x = newPos.x + width / 2;
      pos.y = newPos.y + height / 2;
    }
  }
  
  void checkCollisions() {
    for (Particle p : particles) {
      if (p == this) continue;
      if (dist(p.pos.x, p.pos.y, pos.x, pos.y) >= p.m + m) continue;
      
      //collision
      Polar polar = cartesianToPolar(pos.x - p.pos.x, pos.y - p.pos.y);
      PVector newPos = polarToCartesian(p.m + m, polar.a);
      pos.x = newPos.x + p.pos.x;
      pos.y = newPos.y + p.pos.y;
    }
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