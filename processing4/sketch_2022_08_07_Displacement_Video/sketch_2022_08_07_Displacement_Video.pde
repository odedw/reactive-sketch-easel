boolean SHOULD_SAVE_FRAME = false;
int FRAGMENT_COUNT = int(random(10, 20));
String FILENAME = "highway-with-cars-static.mp4";
Video vid;
// Rect rect;
// ArrayList<PVector> positions = new ArrayList<PVector>(); 
Fragment[] fragments = new Fragment[FRAGMENT_COUNT];
void setup() {
  size(1920,1080);
  vid = loadVideo(FILENAME);
  println("FRAGMENT_COUNT = " + FRAGMENT_COUNT);
  for (int i = 0; i < FRAGMENT_COUNT; ++i) {
    Rect rect = new Rect();
    int repsCount = int(random(10, 50));
    println(i + " repsCount = " + repsCount);
    fragments[i] = new Fragment(rect, repsCount);
  }
  // for (int i = 0; i < 30; ++i) {
  //  positions.add(new PVector(random(0,width), random(0,height)));
  //}
}

void draw() {
  // if (frameCount % 15 == 0) {
  //  positions.add(new PVector(random(0,width), random(0,height)));
  //}
  
  if (vid.frameAvailable()) {
    Movie frame = vid.read();
    image(frame, 0,0,width,height);
    for (Fragment f : fragments) {
      f.draw(frame);
    }
    //for (PVector p : positions) {
    //copy(rect.x, rect.y, rect.w, rect.h, int(p.x), int(p.y), rect.w, rect.h);
    // }
    if (!vid.next()) {
      println("done");
      noLoop();
    }
    if (SHOULD_SAVE_FRAME) {
      saveFrame("output/frame - ######.png");
    }
  }
}

boolean running = true;
void mousePressed() {
  // if (running) {
  //   noLoop();
  // } else {
  //   loop();
  // }
  running = !running;
  println("frameCount : " + frameCount);
}
