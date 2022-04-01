
// float SIZE = 15;
boolean shouldSaveFrame = false;
int NUM_PARTICLES = 300;
int framesForStage = 200;
int framesIncrease = 20;
int framesElapsed = 0;
int steps = 6;
int sizeIncrease;
float denominator;
ArrayList<Particle> particles = new ArrayList<Particle>();
int vLimit = 10;
int r;
boolean exploded = false;
void setup() {
  size(1200,1200);
  r = width / 2;
  denominator = width / 3;
  sizeIncrease = (width / 3 - width / 15) / steps;
  for (int i = 0; i < NUM_PARTICLES; ++i) {
    PVector pos = null;
    float massIndex = random(1);
    float mass = 0;
    if (massIndex < 0.5)
      mass = random(5, 20);
    else if (massIndex < 1) 
      mass = random(20, 50);
    else mass = 200;
    do {
      pos = new PVector(random(width), random(height));
    } while(dist(pos.x, pos.y, width / 2, height / 2) > r - 50);
    particles.add(new Particle(pos.x, pos.y, mass));
  }
}


float frameCountRatio = 30.0;
void draw() {
  background(0); 
  stroke(255);
  strokeWeight(2);
  fill(0,0,0,0);
  
  // if (frameCount % 1 == 0 && r > width / 7) {
  //   r--;
  // } else if (r == width / 7) {
  //   explode();
  // }
  if (!exploded) {
    circle(width / 2, height / 2, r * 2);
    r = int(map(mouseX, 0, width, width / 2, 0));
    // float v = sin(frameCount / frameCountRatio);
    // println(v);
    // r = int(map(v, -1, 1, width / 2, width / denominator));
    // if (v <= -0.9999) {
    // denominator++;
    // frameCountRatio += 50;
    // println("denominator: " + denominator);
    // }
    // if (v >= 0.9999 && denominator == 13) {
    // explode();
    // }
    
    
    
    // framesElapsed++;
    // if (framesElapsed < framesForStage) {
    //   if (denominator <= width / 12 && framesElapsed == framesForStage / 2) {
    //     explode();
    //   } else {
    
    //     boolean isGrowing = framesElapsed > framesForStage / 2;
    //     float val = framesElapsed - (isGrowing ? framesForStage / 2.0 : 0.0);
    //     float min = isGrowing ? denominator : width / 2;
    //     float max =  isGrowing ? width / 2 : denominator;
    //     r = int(map2(val, 0.0, framesForStage / 2.0, min, max, SINUSOIDAL, EASE_IN_OUT));
    //   }
    // } else {
    //   framesElapsed = 0;
    //   framesForStage += framesIncrease;
    //   denominator -= sizeIncrease;
    //   // println("denominator: " + denominator);
    // }
    
  }
  
  for (int i = 0; i < particles.size(); i++) {
    Particle particle = particles.get(i);
    for (int j = 0; j < particles.size(); j++) {
      if (i == j) continue;
      particle.applyForce(particles.get(j).pos, particles.get(j).m);
    }
    particle.step();
    particle.draw();
  }
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

void explode() {
  vLimit = 100;
  r = 10000000;
  exploded = true;
}

void mousePressed() {
  explode();
}
