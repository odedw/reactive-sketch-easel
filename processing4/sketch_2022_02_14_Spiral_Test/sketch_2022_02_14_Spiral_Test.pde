
boolean shouldSaveFrame = false;
PImage img;
float a = 0;
float r = 1;
ArrayList<PVector> points = new ArrayList<PVector>();
PGraphics pg;
void setup() {
  size(1000,1000);
  background(0); 
  noFill();
  stroke(255);
  strokeWeight(1);
  img = loadImage("data/michele-caliani-iLAAT1E-H_8-unsplash.jpg");
  pg = createGraphics(width, height);
  pg.beginDraw();
  
  pg.image(img, 0,0,width, height);
  pg.endDraw();
  
}

PVector getPoint(float r, float a) {
  return new PVector(cos(a) * r, sin(a) * r);
}

void draw() {
  translate(width / 2, height / 2);
  for (int i = 0; i < 100; ++i) {
    
    float nextR = r + 0.008;
    float nextA = a + 0.01;
    PVector p1 = getPoint(r, a);
    PVector p2 = getPoint(nextR, nextA);
    color c = pg.get(int(p2.x + width / 2), int(p2.y + height / 2));
    float avg = brightness(c);//(red(c) + green(c) + blue(c)) / 3;
    strokeWeight(map(avg, 0, 255, 1, 3));
    //strokeWeight(50);
    line(p1.x, p1.y, p2.x, p2.y);
    r = nextR;
    a = nextA;
  }
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
