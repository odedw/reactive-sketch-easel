boolean isRunning = true;
Background bg;
void setup() {
  size(1000,1000);
  bg = new Background();
}

void draw() {
  bg.draw();
}

void mousePressed() {
  isRunning = !isRunning;
  if (isRunning) loop(); else noLoop();
}
