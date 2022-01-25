public class Particle {
  ArrayList<PVector> vertices = new ArrayList<PVector>();
  float size;
  color myFill;
  float r = 0;
  PVector t = new PVector();
  Particle(PVector start) {
    float x = start.x;
    float y = start.y;
    size = random(minSize, maxSize);
    ArrayList<PVector> history = new ArrayList<PVector>();
    myFill = colors[floor(random(colors.length))];
    
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
     ){
        break;
      }
      
      boolean shouldBreak = false;
      for (Particle p : particles) {
        if (p == this) {
          continue;
        }
        for (PVector point : p.vertices) {
          float d = dist(x, y, point.x, point.y);
          if (d < minDistance) {
            shouldBreak = true;
            break;
          }
        }
      }
      if (shouldBreak) {
        break;
      }
      float angle = matrix[col][row];
      float xStep = width * stepLength * cos(angle);
      float yStep = width * stepLength * sin(angle);
      
      x += xStep;
      y += yStep;
    }
    
    for (int i = 0; i < history.size(); ++i) {
      PVector v = history.get(i);
      float xOffset = v.x - leftX;
      float yOffset = v.y - topY;
      int col = int(xOffset / resolution);
      int row = int(yOffset / resolution);
      float angle = matrix[col][row] - PI / 2;
      x = cos(angle) * size + v.x;
      y = sin(angle) * size + v.y;
      
      vertices.add(new PVector(x,y));
    }
    for (int i = history.size() - 1; i >= 0; --i) {
      PVector v = history.get(i);
      float xOffset = v.x - leftX;
      float yOffset = v.y - topY;
      int col = int(xOffset / resolution);
      int row = int(yOffset / resolution);
      float angle = matrix[col][row] + PI / 2;
      x = cos(angle) * size + v.x;
      y = sin(angle) * size + v.y;
      vertices.add(new PVector(x,y));
      
      
    }
  }
  
  void draw(float max) {
    t.x += random( -max, max);
    t.y += random( -max, max);
    noStroke();
    pushMatrix();
    translate(t.x, t.y);
    // rotate(r);
    fill(myFill);
    strokeWeight(2);
    beginShape();
    for (PVector v : vertices) {
      vertex(v.x, v.y);
    }
    
    endShape(CLOSE);
    popMatrix();
  }
}