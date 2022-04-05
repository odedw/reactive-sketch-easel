float STEP = 2;
class Circle{
  color fill;
  float r = 0;
  float x,y;
  Circle(color f, float _x, float _y) {
    fill = f;
    x = _x;
    y = _y;
    
  }
  
  void draw() {
    noStroke();
    stroke(0);
    strokeWeight(1);
    fill(fill, 200);
    // circle(x,y,r);
    int numPoints = 500;
    beginShape();
    for (int i = 0; i < numPoints; ++i) {
      float n = (float) noise.eval(i, x,r / 10.0);
      float d = map(n, -1, 1, -r / 10.0, r / 10.0);
      float a = i * TWO_PI / float(numPoints);
      PVector p = polarToCartesian(r + d, a);
      vertex(p.x + x, p.y + y);
    }
    endShape(CLOSE);
  }
  
  void step() {
    r += STEP;
  }
  
}

class Emitter{
  ArrayList<Circle> circles = new ArrayList<Circle>();
  float x,y;
  int colorIndex = 0;
  Emitter(float _x, float _y) {
    x = _x;
    y = _y;
  }
  
  void step() {
    for (int i = 0; i < circles.size(); ++i) {
      Circle c = circles.get(i);
      c.r += STEP;
    }
    if (frameCount % CIRCLE_FRAME == 0) {
      circles.add(new Circle(colors[colorIndex], x, y));
      colorIndex = (colorIndex + 1) % colors.length;
    }
  }
}