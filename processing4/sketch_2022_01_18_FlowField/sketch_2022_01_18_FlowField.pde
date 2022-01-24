float stepsCycle = 10.0;
float stepLengthCycle = 200.0;
float zNoiseCycle = 300.0;

float scale = 0.01;
float noiseScale = 0.045; 
int strokeWeight = 3;
int numSteps = 1000;
float stepLength = 0.0001;
PImage img; 
float[][] matrix;
int resolution;

color[][] colorMatrix;
PGraphics pg;
PVector[] points;
int leftX, rightX, topY, bottomY, cols, rows;

void setup() { 
  size(1000, 1000);  
  img = loadImage("michele-caliani-iLAAT1E-H_8-unsplash.jpg");  
  noFill();
  strokeWeight(strokeWeight);
  
  // color matrix
  colorMatrix = new color[width][height];
  pg = createGraphics(width, height);
  pg.beginDraw();
  
  pg.image(img, 0,0,width, height);
  pg.endDraw();
  for (int x = 0; x < width; ++x) {
    for (int y = 0; y < height; ++y) {
      colorMatrix[x][y] = pg.get(x, y);
    }
  }
  
  // points
  int NUM_POINTS = 10000;
  points = new PVector[NUM_POINTS];
  for (int i = 0; i < NUM_POINTS; ++i) {
    points[i] = new PVector(floor(random(0, width)),floor(random(0, height)));
  }
  
  resolution = int(width * scale);
  
  leftX = int(width * - 0.25);
  rightX = int(width * 1.25);
  topY = int(height * - 0.25);
  bottomY = int(height * 1.25);
  cols = int((rightX - leftX) / resolution);
  rows = int((bottomY - topY) / resolution);
}

void drawCurve(float x, float y) {
  stroke(colorMatrix[int(x)][int(y)]);
  beginShape();
  int steps = numSteps + int(sin(frameCount / stepLengthCycle) * 100.0);
  for (int i = 0; i < steps; i++) {
    vertex(x, y);
    float xOffset = x - leftX;
    float yOffset = y - topY;
    int col = int(xOffset / resolution);
    int row = int(yOffset / resolution);
    
    if (
      col >= cols || 
      col < 0 || 
      row >= rows || 
      row < 0 || 
      x < 0 || 
      x >= width || 
      y < 0 || 
      y >= height
   ){
      break;
    }
    float angle = matrix[col][row];
    color c = colorMatrix[int(x)][int(y)];
    stroke(c);
    
    float xStep = width * stepLength * cos(angle) * sin(frameCount / stepLengthCycle);
    float yStep = width * stepLength * sin(angle) * sin(frameCount / stepLengthCycle);;
    x += xStep;
    y += yStep;
  }
  endShape();
}

void draw() {
  background(0);
  //angle matrix
  matrix = new float[cols][rows];
  for (int col = 0; col < cols; ++col) {
    for (int row = 0; row < rows; ++row) {
      matrix[col][row] = noise(col * noiseScale , row * noiseScale, sin(frameCount / zNoiseCycle)) * TWO_PI;//frameCount * noiseScale / 5) * TWO_PI;
    }
  }
  
  for (int i = 0; i < points.length; ++i) {
    drawCurve(points[i].x, points[i].y);
  }
  saveFrame("temp/flow-field-sl-####.png");
}
