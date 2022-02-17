public enum State {
  BLUE_FILL,
  BLACK_FILL,
  DELETE,
  DONE;
  
  public State next() {
    // No bounds checking required here, because the last instance overrides
    return values()[ordinal() + 1];
  }
}

int STROKE_WEIGHT = 10;
boolean shouldSaveFrame = true;
PImage img;
PGraphics pg;
Bfs bfs;
State state = State.BLUE_FILL;
boolean filledOuter = false;
interface Callback{
  void callback(Point point);
}

Callback callback;
void setup() {
  size(1000,1000);
  background(255);
  img = loadImage("blue725a.png");
  noStroke();
  // drawing
  pg = createGraphics(width, height);
  pg.beginDraw();
  pg.noStroke();
  pg.rectMode(CENTER);
  pg.image(img, 0,0,width , height);
  pg.translate(width / 2, height / 2);
  pg.strokeWeight(STROKE_WEIGHT);
  pg.stroke(255);
  pg.fill(0);
  pg.rect(0,0,width / 2, height / 2);  
  pg.endDraw();
  
  callback = point -> mark(point);
  bfs = new Bfs(new Rect(0,0,width,height), new Rect(width / 4 - STROKE_WEIGHT + 7, height / 4 - STROKE_WEIGHT + 7, width / 2 + STROKE_WEIGHT - 2, height / 2 + STROKE_WEIGHT - 2), new Point(0,0), callback);
  bfs.step();
}

void mark(Point p) {
  color c = state == State.DELETE ? 255 : pg.get(int(p.x), int(p.y));
  fill(c);
  rect(p.x, p.y, 1, 1);
}

void createNextBfs() {
  if (state == State.BLACK_FILL) {
    bfs = new Bfs(new Rect(width / 4, height / 4 , width , height), null, new Point(width / 4, height / 4), callback);
  } else if (state == State.DELETE) {
    bfs = new Bfs(new Rect(0,0,width,height), null, new Point(0,0), callback);
  }
}

void draw() {
  if (state != State.DONE) {
    for (int i = 0; i < 1000; ++i) {
      boolean result = bfs.step();
      if (!result) {
        state = state.next();
        println("state: " + state);
        if (state != State.DONE) {
          createNextBfs();
        } 
        break;
      }
    }
  }
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
