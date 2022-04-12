
boolean shouldSaveFrame = true;
int vLimit = 10;
color[] colors = {#f6d2ac, #e6ae74,#d6834f,#a35233, #42281c};

PImage img;
Pixel[][] pixels; 
boolean[][] stuckPixels;
ArrayList<Particle> particles = new ArrayList<Particle>();
void setup() {
  size(1000,1000);
  stuckPixels = new boolean[width][height];
  img = loadImage("data/michele-caliani-iLAAT1E-H_8-unsplash.png");
  pixels = getPixels(img);
  // for (int i = 0; i < 1; ++i) {
  //   Particle p = new Particle(random(width), random( -3, -1));
  //   p.a = new PVector(random( -2, 2), random(8, 12));
  //   particles.add(p);
  // }
  
}

void draw() {
  background(255); 
  if (frameCount <= 10 * 60) {
    for (int i = 0; i < 1000; ++i) {
      Particle p = new Particle(random(width), random( -10, -1));
      p.a = new PVector(random( -2, 2), random(8, 12));
      particles.add(p);
    }
  }
  for (Particle p : particles) {
    if (p.p.y > height || p.p.x < 0 || p.p.x > width) {
      continue;
    }
    p.step();
    p.draw();
  }
  if (frameCount == 30 * 60) {
    noLoop();
  }
  if (shouldSaveFrame) {
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
