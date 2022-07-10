
boolean SHOULD_SAVE_FRAME = false;
int STEP_SIZE = 2;

ArrayList<Strand> strands = new ArrayList();
void setup() {
  size(1000,1000);
  stroke(0);
  strokeWeight(5);
  background(#e6e6e6); 
  line(width / 2, height, width / 2, height / 3);
  for (int y = int(1.2 * height); y > height / 3;y--) {
    strands.add(new Strand(width / 2, y, 1.2 * PI, #4375C4, STEP_SIZE));
    strands.add(new Strand(width / 2, y, 1.8 * PI, #4375C4, STEP_SIZE));
  }
}

void draw() {
  //background(#e6e6e6); 
  for (Strand s : strands) {
    s.draw();
  }
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
