boolean SHOULD_SAVE_FRAME = false;
int NUM_SLICES = 10;
int SLICE_SHIFT = 20;

PImage img;
PGraphics pg1,pg2, frame;
PGraphics mask;

ArrayList<Slice> slices = new ArrayList<Slice>();
void setup() {
  size(1000,1000);
  img = loadImage("data/" + "elizeu-dias-RN6ts8IZ4_0-unsplash.jpg");
  stroke(255);
  fill(0,255,0);
  strokeWeight(0);
  for (int i = 0; i < NUM_SLICES; ++i) {
    slices.add(generateSlice());
  }
  frame = createGraphics(width, height);
  pg1 = createGraphics(width, height);
  pg2 = createGraphics(width, height);
  
  
  
}

Slice generateSlice() {
  float a = random(0, PI);
  return new Slice(random(width / 2 - 200, width / 2 + 200), random(height / 2 - 200, height / 2 + 200), a);//random(TWO_PI));
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
  frame.beginDraw();
  frame.background(#000000); 
  frame.image(img, 200, 200, width - 400, height - 400);  
  frame.endDraw();
  
  PGraphics next = frame, prev;
  for (Slice s : slices) {
    prev = next;
    next = slice(s, prev);
  } 
  image(next, 0, 0, width, height);
  
  
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
  
  
  
  // noLoop();
  if (SHOULD_SAVE_FRAME) {
    saveFrame("output/frame-######.png");
  }
}

boolean running = true;
void mousePressed() {
  // index = (index + 1) % slices.size();
  slices.clear();
  for (int i = 0; i < NUM_SLICES; ++i) {
    slices.add(generateSlice());
  }
  
  // if (running) {
  //   noLoop();
  // } else {
  //   loop();
  // }
  // running = !running;
  // println("frameCount: " + frameCount);
}
