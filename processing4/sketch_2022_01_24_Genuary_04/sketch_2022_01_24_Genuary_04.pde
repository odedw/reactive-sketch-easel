boolean debug = false;

float maxSize = 25;
float minSize = 5;
float scale = 0.01;
float noiseScale = 0.01; 
int strokeWeight = 3;
int numSteps = 500;
float stepLength = 0.001;
int numParticles = 1000;
FlowField flowField;
float gridResolution = 30;
int index = 0;
float minDistance = 30;
color[] colors = new color[]{#29A691, #3B2B20, #DB4F54, #F7B1A1, #FCBC19, #315F8C};
ArrayList<Particle> particles = new ArrayList<Particle>();
ArrayList<PVector> startPoints = new ArrayList<PVector>();

void setup() { 
  size(1000, 1000);  
  noFill();
  strokeWeight(strokeWeight);
  rectMode(CENTER);
  flowField = new FlowField();
  
  // for (int i = 0; i < numParticles; ++i) {
  // float jumps = floor(width / gridResolution);
  // for (int row = 0; row < gridResolution; ++row) {
  //   for (int col = 0; col < gridResolution; ++col) {
  //     // PVector start = new PVector(jumps * col,jumps * row);
  //     PVector start = new PVector(random(width),random(height));
  //     startPoints.add(start);
  //   }
  // }
  
  for (int i = 0; i < numParticles; ++i) {
    PVector start = new PVector(random(width),random(height));
    Particle p = new Particle(start);
    if (p.vertices.size() >= 100) {
      particles.add(p);
    }
    if (i % 100 == 0) {
      println("i: " + i);
    }
  }
  println("added " + particles.size() + " curves");
  background(#EBE4D8);
  
}

void draw() {
  if (debug) {
    flowField.draw();
  }
  
  if (index < particles.size()) {
    Particle p = particles.get(index);
    p.draw(0);
    index++;
  } else {
    background(#EBE4D8);
    
    float max = 30 - map(cos(frameCount / 700.0), -1,1,0,30);
    println(max);
    
    for (Particle p : particles) {
      p.draw(max);
    }
    if (max >= 29.9) {
      noLoop();
    }
  }
  saveFrame("output-3/genuary-04-03-######.png");
  
}
