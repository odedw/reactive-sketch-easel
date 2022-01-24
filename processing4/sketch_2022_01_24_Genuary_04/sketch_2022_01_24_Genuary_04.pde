boolean debug = true;

float scale = 0.01;
float noiseScale = 0.045; 
int strokeWeight = 3;
int numSteps = 1000;
float stepLength = 0.0001;

OpenSimplexNoise noise = new OpenSimplexNoise();
int resolution;
PVector[] points;
int leftX, rightX, topY, bottomY, cols, rows;
float[][] matrix;

void setup() { 
  size(1000, 1000);  
  noFill();
  strokeWeight(strokeWeight);
  
  // points
  int NUM_POINTS = 10000;
  points = new PVector[NUM_POINTS];
  for (int i = 0; i < NUM_POINTS; ++i) {
    points[i] = new PVector(floor(random(0, width)),floor(random(0, height)));
  }
  
  // vectors
  resolution = int(width * scale);
  leftX = int(width * - 0.25);
  rightX = int(width * 1.25);
  topY = int(height * - 0.25);
  bottomY = int(height * 1.25);
  cols = int((rightX - leftX) / resolution);
  rows = int((bottomY - topY) / resolution);
  
  // noise matrix
  matrix = new float[cols][rows];
  for (int col = 0; col < cols; ++col) {
    for (int row = 0; row < rows; ++row) {
      float  n = (float) noise.eval(col, row);
      float angle = map(n, -1, 1, 0, TWO_PI);
      matrix[col][row] = noise(col * noiseScale , row * noiseScale,0) * TWO_PI;//frameCount * noiseScale / 5) * TWO_PI;
    }
  }
}

void draw() {
  background(0);
  if (debug) {
    for (int y = 0; y < rows; y++) {
      for (int x = 0; x < cols; x++) {
        float angle = matrix[x][y];        
        stroke(255);
        strokeWeight(2);
        pushMatrix();
        translate(x * resolution, y * resolution);
        rotate(angle);
        line(0, 0, resolution, 0);
        popMatrix();
      }
    }
  }
}
