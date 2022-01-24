OpenSimplexNoise noise = new OpenSimplexNoise();

int resolution;
PVector[] points;
int leftX, rightX, topY, bottomY, cols, rows;
float[][] matrix;

public class FlowField {
  FlowField() {
    // vectors
    resolution = int(width * scale);
    leftX = int(width * - 0.25);
    rightX = int(width * 1.25);
    topY = int(height * - 0.25);
    bottomY = int(height * 1.25);
    cols = int((rightX - leftX) / resolution);
    rows = int((bottomY - topY) / resolution);
    
    //noise matrix
    matrix = new float[cols][rows];
    float zOffset = random(1000);
    for (int col = 0; col < cols; ++col) {
      for (int row = 0; row < rows; ++row) {
        float n = (float) noise.eval(col * noiseScale, row * noiseScale, zOffset);
        float angle = map(n, -1, 1, 0, TWO_PI);//PI / 4, PI / 4 + PI / 2);
        matrix[col][row] = angle;
      }
    }
  }
  
  void draw() {
    for (int y = 0; y < rows; y++) {
      for (int x = 0; x < cols; x++) {
        float angle = matrix[x][y];        
        stroke(255, 255, 255, 100);
        strokeWeight(2);
        pushMatrix();
        translate(leftX + x * resolution, topY + y * resolution);
        rotate(angle);
        line(0, 0, resolution, 0);
        popMatrix();
      }
    }
  }
  
  // void rotate(float angle) {
  //   for (int y = 0; y < rows; y++) {
  //     for (int x = 0; x < cols; x++) {
  //       matrix[x][y] = (matrix[x][y] + angle) % TWO_PI;
  //     }
  //   }
  // }
}