int maxLevel = 1;
Quadtree qt;
void setup() {
  size(1000, 1000);  
  rectMode(CENTER);
  strokeWeight(1);
  qt = new Quadtree(new Rect(width / 2, height / 2, 600, 600), State.PRE_ZOOMING, 1, 2);
  stroke(255);
  
}

void draw() {
  // if (maxLevel < 13) {
  background(0);
  // }
  // if (maxLevel == 16) {
  // noLoop();
  // }
  qt.update();
  qt.draw();
  if (frameCount % 100 == 0) {
    println("frameCount: " + frameCount + ", maxLevel: " + maxLevel);
  }
  saveFrame("output/genuary-05-#####.png");
}