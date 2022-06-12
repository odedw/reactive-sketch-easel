boolean isRunning = true;
void setup() {
  size(1000,1000);
  
}

void draw() {
  background(#e6e6e6);
  for (int i = 0; i < 10; ++i) {
    PVector p = polarToCartesian(width * 0.35, i * (TWO_PI / 10.0));
    circle(p.x + width / 2, p.y + height / 2, 10);
  }
  
}

void mousePressed() {
  isRunning = !isRunning;
  if (isRunning) loop(); else noLoop();
}
