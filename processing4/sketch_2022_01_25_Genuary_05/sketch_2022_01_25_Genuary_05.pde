int maxLevel = 1;
Quadtree qt;
ArrayList<Pixel> pixels;
void setup() {
  PImage img = loadImage("michele-caliani-iLAAT1E-H_8-unsplash.jpg");  
  ArrayList<Pixel> pixels = getPixels(img);
  pixels.sort((o1, o2) -> int(o2.brightness - o1.brightness));
  println(pixels.size());
  
  size(1000, 1000);  
  rectMode(CENTER);
  strokeWeight(2);
  qt = new Quadtree(new Rect(width / 2, height / 2, 600, 600), State.PRE_ZOOMING_OUT, 1, 1, pixels);
  stroke(255);
}

void draw() {
  //if (maxLevel < 13) {
  background(0);
  // }
  //if (maxLevel == 16) {
  //noLoop();
  // }
  qt.update();
  qt.draw();
  if (frameCount % 100 == 0) {
    println("frameCount: " + frameCount + ", maxLevel: " + maxLevel);
  }
  saveFrame("output/genuary-05-#####.png");
}
