public class Particle {
  ArrayList<PVector> history = new ArrayList<PVector>();
  
  Particle(PVector start) {
    
    float x = start.x;
    float y = start.y;
    
    for (int i = 0; i < numSteps; i++) {
      history.add(new PVector(x, y));
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
     ) {
        break;
      }
      float angle = matrix[col][row];
      float xStep = width * stepLength * cos(angle);
      float yStep = width * stepLength * sin(angle);
      
      x += xStep;
      y += yStep;
    }
  }
  
  void draw() {
    stroke(255);
    noFill();
    strokeWeight(2);
    beginShape();
    for (PVector v : history) {
      vertex(v.x, v.y);
    }
    endShape();
  }
}