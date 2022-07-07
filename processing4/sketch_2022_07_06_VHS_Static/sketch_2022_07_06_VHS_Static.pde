
boolean SHOULD_SAVE_FRAME = false;

OpenSimplexNoise noise = new OpenSimplexNoise();
PGraphics pg;

void setup() {
  size(1000,1000);
  pg = createGraphics(600, 600);
  pg.noStroke();
}

void draw() {
  pg.beginDraw(); 
  for (int x = 0;x < pg.width;x++) {
    for (int y = 0; y < pg.height; y++) {
      float val = (float) noise.eval(x / 20.0,y,frameCount / 1.0);
      float c = map(val, -1,1,0,255);
      pg.fill(c);
      pg.square(x,y,1);
    }
  }
  pg.endDraw();
  image(pg, 0,0,width,height);
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
