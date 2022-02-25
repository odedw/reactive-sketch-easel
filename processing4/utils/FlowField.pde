OpenSimplexNoise noise = new OpenSimplexNoise();

class FlowField{
  int resolution,leftX, rightX, topY, bottomY, cols, rows;
  float[][] matrix;
  float noiseScale = 0.01; 
  
  FlowField(float scale) {
    this(scale, 0.01);
  }
  
  FlowField(float scale, float noiseScale) {
    resolution = int(width * scale);
    
    leftX = int(width * - 0.25);
    rightX = int(width * 1.25);
    topY = int(height * - 0.25);
    bottomY = int(height * 1.25);
    cols = int((rightX - leftX) / resolution);
    rows = int((bottomY - topY) / resolution);    
    matrix = new float[cols][rows];
    
    generateNoiseMatrix(random(100));
  }
  void generateNoiseMatrix(float z) {
    for (int col = 0; col < cols; ++col) {
      for (int row = 0; row < rows; ++row) {
        matrix[col][row] = (float) noise.eval(col * this.noiseScale, row * this.noiseScale, z);
      }
    }
  }
  void step() {
    generateNoiseMatrix(frameCount / 10.0);
  }
  
  void draw() {
    strokeWeight(3);
    for (int col = 0; col < cols; ++col) {
      for (int row = 0; row < rows; ++row) {
        pushMatrix();
        translate(col * resolution + leftX, row * resolution + topY);
        rotate(map(matrix[col][row], -1,1, 0, TWO_PI));
        line( -resolution / 2, 0,resolution / 2, 0);
        popMatrix();
      }
    }
  }
  
  float get(int x, int y) {
    return this.get(x, y, -1, 1);
  }
  
  float get(int x, int y, float min, float max) {
    float xOffset = x - this.leftX;
    float yOffset = y - this.topY;
    int col = int(xOffset / resolution);
    int row = int(yOffset / resolution);
    return map(matrix[col][row], -1, 1, min, max);
  }
}