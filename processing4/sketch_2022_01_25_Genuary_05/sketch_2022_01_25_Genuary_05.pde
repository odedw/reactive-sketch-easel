Quadtree qt;
void setup() {
  size(1000, 1000);  
  rectMode(CENTER);
  qt = new Quadtree(new Rect(width / 2, height / 2, 400, 300));
}

void draw() {
  background(0);
  qt.draw();
  
}