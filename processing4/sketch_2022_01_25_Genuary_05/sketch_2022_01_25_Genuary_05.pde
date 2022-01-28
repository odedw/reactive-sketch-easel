int maxLevel = 1;
Quadtree qt;
void setup() {
  size(1000, 1000);  
  rectMode(CENTER);
  strokeWeight(1);
  qt = new Quadtree(new Rect(width / 2, height / 2, 600, 600), State.PRE_SUBDIVIDE, 1);
  stroke(255);
  
}

void draw() {
  if (maxLevel < 11) {
    background(0);
  }
  qt.update();
  qt.draw();
  if (frameCount % 60 == 0) {
    println("frameCount: " + frameCount + ", maxLevel: " + maxLevel);
  }
}