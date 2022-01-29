int maxLevel = 1;
Quadtree qt;
void setup() {
  size(1000, 1000);  
  rectMode(CENTER);
  strokeWeight(2);
  qt = new Quadtree(new Rect(width / 2, height / 2, 600, 600), State.PRE_ZOOMING_OUT, 1, 2, #DB4F54);
  stroke(0);
  noStroke();
}

void draw() {
  //if (maxLevel < 13) {
  background(#EBE4D8);
  // }
  //if (maxLevel == 16) {
  //noLoop();
  // }
  qt.update();
  qt.draw();
  if (frameCount % 100 == 0) {
    println("frameCount: " + frameCount + ", maxLevel: " + maxLevel);
  }
  //saveFrame("output/genuary-05-#####.png");
}