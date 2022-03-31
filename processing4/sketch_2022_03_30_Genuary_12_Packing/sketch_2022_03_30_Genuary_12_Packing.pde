
// float SIZE = 15;
boolean shouldSaveFrame = false;
ArrayList<Particle> particles = new ArrayList<Particle>();
ArrayList<PVector> perimeter = new ArrayList<PVector>();
int vLimit = 10;
int r;
void setup() {
  size(1200,1200);
  r = width / 2;
  for (int i = 0; i < 1000; ++i) {
    particles.add(new Particle(random(width), random(height), random(5, 50)));
  }
  computePerimeter();
}

void computePerimeter() {
  perimeter.clear();
  for (int i = 0; i < 360; ++i) {
    PVector p = polarToCartesian(r, i * TWO_PI / 360);
    p.x += width / 2;
    p.y += height / 2;
    perimeter.add(p);
  }
}
void draw() {
  background(0); 
  stroke(255);
  strokeWeight(1);
  fill(0,0,0,0);
  if (perimeter.size() > 0) {
    circle(width / 2, height / 2, r * 2);
  }
  if (frameCount % 1 == 0 && r > width / 8) {
    r--;
    computePerimeter();
  } else if (r == width / 8) {
    perimeter.clear();
    vLimit = 1000;
  }
  
  for (int i = 0; i < particles.size(); i++) {
    Particle particle = particles.get(i);
    for (int j = 0; j < particles.size(); j++) {
      if (i == j) continue;
      particle.applyForce(particles.get(j).pos, particles.get(j).m);
    }
    for (PVector p : perimeter) {
      if (dist(p.x, p.y, particle.pos.x, particle.pos.y) < particle.m) {
        particle.applyForce(p, 100, 1000);
      }
    }
    particle.step();
    particle.draw();
  }
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

PVector polarToCartesian(float r, float a) {
  return new PVector(cos(a) * r, sin(a) * r);  
}