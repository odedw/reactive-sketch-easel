int STROKE_WEIGHT = 10;
boolean shouldSaveFrame = false;
PImage img;
PGraphics pg;
Bfs bfs;
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
  color c = pg.get(int(p.x), int(p.y));
  fill(c);
  rect(p.x, p.y, 1, 1);
}

void draw() {
  boolean done = false;
  for (int i = 0; i < 1000; ++i) {
    done = !bfs.step();
    if (done) {
      if (!filledOuter) {
        filledOuter = true;
        bfs = new Bfs(new Rect(width / 4, height / 4 , width , height), null, new Point(width / 4, height / 4), callback);
      }
      break;
    } 
  }
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
