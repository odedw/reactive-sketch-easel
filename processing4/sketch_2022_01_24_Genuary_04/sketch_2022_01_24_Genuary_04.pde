boolean debug = true;

float scale = 0.01;
float noiseScale = 0.02; 
int strokeWeight = 3;
int numSteps = 1000;
float stepLength = 0.001;
int numParticles = 1000;
FlowField flowField;
float gridResolution = 20;

ArrayList<Particle> particles = new ArrayList<Particle>();

void setup() { 
  size(1000, 1000);  
  noFill();
  strokeWeight(strokeWeight);
  
  flowField = new FlowField();
  
  // for (int i = 0; i < numParticles; ++i) {
  float jumps = floor(width / gridResolution);
  for (int col = 0; col < gridResolution; ++col) {
    for (int row = 0; row < gridResolution; ++row) {
      PVector start = new PVector(jumps * col,jumps * row);
      particles.add(new Particle(start));
    }
  }
}

void draw() {
  background(0);
  if (debug) {
    flowField.draw();
  }
  
  for (Particle p : particles) {
    p.draw();
  }
}
