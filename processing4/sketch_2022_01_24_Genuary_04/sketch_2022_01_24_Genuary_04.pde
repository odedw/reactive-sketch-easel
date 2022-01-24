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
  
  flowField = new FlowField();
  
  // for (int i = 0; i < numParticles; ++i) {
  float jumps = floor(width / gridResolution);
  for (int row = 0; row < gridResolution; ++row) {
    for (int col = 0; col < gridResolution; ++col) {
      // PVector start = new PVector(jumps * col,jumps * row);
      PVector start = new PVector(random(width),random(height));
      startPoints.add(start);
    }
  }
}

void draw() {
  background(#EBE4D8);
  if (debug) {
    flowField.draw();
  }
  
  if (index < startPoints.size()) {
    // flowField.rotate(PI / 8);
    Particle p = new Particle(startPoints.get(index));
    if (p.vertices.size() >= 200) {
      particles.add(p);
    }
    index++;
  }
  for (Particle p : particles) {
    p.draw();
  }
}
