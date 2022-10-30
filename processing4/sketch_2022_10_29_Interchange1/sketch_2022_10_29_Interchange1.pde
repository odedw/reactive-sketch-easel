int WIDTH = 10;
int GAP = WIDTH / 5;
boolean SHOULD_SAVE_FRAME = false;


ArrayList<Track> tracks = new ArrayList<Track>();

void setup() {
  size(1000,1000);
  int x =  int(random( -WIDTH, 0));
  while(x < width) {
    Track t = new Track(x,int(random(WIDTH - 1, WIDTH + 1)), int(random(1, 3)));
    tracks.add(t);
    x += t.w + GAP;
  }
}

void draw() {
  background(200); 
  for (Track t : tracks) {
    t.update();
    t.draw();
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
