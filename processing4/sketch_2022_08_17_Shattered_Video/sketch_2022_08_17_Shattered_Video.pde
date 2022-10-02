boolean SHOULD_SAVE_FRAME = false;
int SLICE_SHIFT = 20;
int GAP = 50;
String FILENAME = "production ID_4363280.mp4";

Video vid;
// PImage img;
PGraphics pg1,pg2;//, frame;
PGraphics mask;

ArrayList<Slice> slices = new ArrayList<Slice>();
void setup() {
  size(1280,720);
  stroke(255);
  fill(0,255,0);
  strokeWeight(0);
  generateSlices();
  vid = loadVideo(FILENAME);
  pg1 = createGraphics(width, height);
  pg2 = createGraphics(width, height);
}

void generateSlices() {
  int cols = 5;
  int rows = 3;
  for (int i = 0; i < cols; ++i) {
    for (int j = 0; j < rows; ++j) {
      float a = random(0, PI);
      float x = (i + 1) * width / (cols + 1);
      float y = (j + 1) * height / (rows + 1);
      Slice s = new Slice(x, y, a);
      slices.add(s);
    }
  }
  println("After generation: " + slices.size());
  
  // for (int i = 0; i < NUM_SLICES; ++i) {
  //   float a = random(0, PI);
  //   Slice s = new Slice(random(width / 2 - 200, width / 2 + 200), random(height / 2 - 200, height / 2 + 200), a);
  //   slices.add(s);
  // }
}

PGraphics slice(Slice s, PGraphics pg) {
  PGraphics result = createGraphics(pg.width, pg.height);
  pg1.beginDraw(); pg2.beginDraw();
  pg1.noStroke(); pg2.noStroke();
  pg1.fill(0); pg2.fill(0);
  pg1.rect( -width, -height, width * 2, height * 2);
  pg2.rect( -width, -height, width * 2, height * 2);
  pg1.image(pg, 0, 0, width, height);
  pg2.image(pg, 0, 0, width, height);
  pg1.mask(s.mask1);
  pg2.mask(s.mask2);
  result.beginDraw();
  result.background(0);
  PVector origin = polarToCartesian( -SLICE_SHIFT, s.a);
  result.image(pg1, origin.x, origin.y, width, height);
  origin = polarToCartesian(SLICE_SHIFT, s.a);
  result.image(pg2, origin.x, origin.y, width, height);
  result.endDraw();
  return result;
}

int index = 0;
void draw() {
  // frame.beginDraw();
  // frame.background(#000000); 
  // frame.image(img, 200, 200, width - 400, height - 400);  
  // frame.endDraw();
  
  // PGraphics next = frame, prev;
  // for (Slice s : slices) {
  //   prev = next;
  //   next = slice(s, prev);
  // } 
  // image(next, 0, 0, width, height);
  
  
  // debug
  // if (index + 1 == slices.size()) return;
  // Slice s = slices.get(index + 1);
  // stroke(0,255,0);
  // strokeWeight(5);
  // circle(s.x, s.y, 15);
  // stroke(255,0,0);
  // circle(s.p1.x, s.p1.y, 15);
  // stroke(0,0,255);
  // circle(s.p2.x, s.p2.y, 15);
  // stroke(0,255,0);
  
  // line(s.p1.x, s.p1.y, s.x, s.y);
  // line(s.p2.x, s.p2.y, s.x, s.y);
  
  
  if (vid.frameAvailable()) {
    Movie frame = vid.read();
    PGraphics next = createGraphics(width, height);
    next.beginDraw();
    next.background(#000000); 
    next.image(frame, GAP, GAP * 16 / 9.0, width - GAP * 2, height - 2 * GAP * 16 / 9.0);  
    next.endDraw();
    next.beginDraw();
    
    next.endDraw();
    PGraphics prev;
    for (Slice s : slices) {
      prev = next;
      next = slice(s, prev);
    } 
    image(next, 0, 0, width, height);
    
    
    
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
  // slices.clear();
  // generateSlices();
  println(frameCount);
}
