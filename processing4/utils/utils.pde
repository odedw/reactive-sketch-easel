FlowField field;
boolean isRunning = true;
void setup() {
  size(1000,1000);
  stroke(0);
  noStroke();
  fill(0);
  field = new FlowField(0.01,1);
  background(#e6e6e6);
  field.draw();
  for (int x = 0; x < width; ++x) {
    for (int y = 0; y < height; ++y) {
      fill(field.get(x,y, 0, 255));
      rect(x,y,1,1);
    }
  }
}

void draw() {
  // for (int i = 0; i < 10000; ++i) {
  //   int x = int(random(0, width));
  //   int y = int(random(0, height));
  //   fill(field.get(x,y, 0, 255));
  //   rect(x,y,1,1);
  // }
}

void mousePressed() {
  isRunning = !isRunning;
  if (isRunning) loop(); else noLoop();
}
