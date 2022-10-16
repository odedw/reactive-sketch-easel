boolean SHOULD_SAVE_FRAME = true;
int SLICE_SHIFT = 20;
int GAP = 150;
String FILENAME = "pexels-koolshooters-7673888.mp4";
int FRAMES_PER_SLICE = 10;
int FRAMES_BETWEEN_SLICES = 10;

Video vid;
PGraphics pg1,pg2;
PGraphics mask;
int sliceIndex = -1;
int sliceFrameIndex = 0;

ArrayList<Slice> slices = new ArrayList<Slice>();
void setup() {
  size(1080,1080);
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
  int rows = 5;
  for (int i = 0; i < cols; ++i) {
    for (int j = 0; j < rows; ++j) {
      float a = random(0, PI);
      float x = (i + 1) * width / (cols + 1);
      float y = (j + 1) * height / (rows + 1);
      Slice s = new Slice(x, y, a);
      slices.add(s);
    }
  }
  println("Number of slices: " + slices.size());
  
  // for (int i = 0; i < NUM_SLICES; ++i) {
  //   float a = random(0, PI);
  //   Slice s = new Slice(random(width / 2 - 200, width / 2 + 200), random(height / 2 - 200, height / 2 + 200), a);
  //   slices.add(s);
  // }
}

PGraphics slice(Slice s, PGraphics pg, float progress) {
  // println(progress);
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
  float shift = lerp(0, SLICE_SHIFT, progress);
  PVector origin = polarToCartesian( -shift, s.a);
  result.image(pg1, origin.x, origin.y, width, height);
  origin = polarToCartesian(shift, s.a);
  result.image(pg2, origin.x, origin.y, width, height);
  result.endDraw();
  return result;
}

int index = 0;
void draw() {
  if (!vid.frameAvailable()) return;
  
  sliceFrameIndex = (sliceFrameIndex + 1) % FRAMES_PER_SLICE;
  if (sliceFrameIndex == 0) {
    sliceIndex++;
  }
  
  Movie frame = vid.read();
  PGraphics next = createGraphics(width, height);
  next.beginDraw();
  next.background(#000000); 
  next.image(frame, -420,0,1920,1080);///GAP, GAP * 9 / 16.0, width - GAP * 2, height - 2 * GAP * 9 / 16.0);  
  next.endDraw();
  PGraphics prev;
  float progress = float(sliceFrameIndex) / FRAMES_PER_SLICE;
  for (int i = 0; i <= min(sliceIndex, slices.size() - 1); ++i) {
    prev = next;
    Slice s = slices.get(i);
    next = slice(s, prev, i == sliceIndex ? progress : 1);
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

boolean running = true;
void mousePressed() {
  // slices.clear();
  // generateSlices();
  println(frameCount);
}
