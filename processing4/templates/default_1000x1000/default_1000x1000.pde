boolean SHOULD_SAVE_FRAME = false;

void setup() {
  size(1000,1000);
}

void draw() {
  background(#e6e6e6); 
  
  if (SHOULD_SAVE_FRAME) {
    saveFrame("output/frame-######.png");
  }
}

boolean running = true;
void mousePressed() {
  if (running) {
    noLoop();
  } else {
    loop();
  }
  running = !running;
  println("frameCount: " + frameCount);
}
