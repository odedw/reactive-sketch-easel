
boolean SHOULD_SAVE_FRAME = false;
int NUM_PARTICLES = 100;
float MAX_DISTANCE = 100;
PImage img;
color from = color(255, 0, 0);
color to = color(0, 0, 255);
ArrayList<Particle> particles = new ArrayList<Particle>();


void setup() {
  size(1000,1000);
  fill(0,255,0);
  stroke(0,255,0);
  ellipseMode(RADIUS);
  img = loadImage("data/max-bender-1YHXFeOYpN0-unsplash.jpg");
  
  for (int i = 0; i < NUM_PARTICLES; ++i) {
    particles.add(new Particle());
  }
}

void draw() {
  background(0); 
  // noStroke();
  
  for (Particle p : particles) {
    p.step();
    p.draw();
  }
  strokeWeight(2);
  
  for (int i = 0; i < particles.size() - 1; ++i) {
    for (int j = i + 1; j < particles.size(); ++j) {
      if (dist(particles.get(i).p.x, particles.get(i).p.y, particles.get(j).p.x, particles.get(j).p.y) < MAX_DISTANCE) {
        stroke(lerpColor(from, to, particles.get(i).p.x / width));
        line(particles.get(i).p.x, particles.get(i).p.y, particles.get(j).p.x, particles.get(j).p.y);
      }
      
    } 
  }
  
  if (SHOULD_SAVE_FRAME) {
    saveFrame("output/frame-######.png");
  }
}

boolean running = true;
void mousePressed() {
  if (running) {
    noLoop();
  } else {
    loop();
  }
  running = !running;
  println("frameCount: " + frameCount);
}
