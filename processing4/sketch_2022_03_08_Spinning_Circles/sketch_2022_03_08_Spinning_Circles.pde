
boolean shouldSaveFrame = true;
String imagePath = "images/michele-caliani-iLAAT1E-H_8-unsplash.jpg";
PImage img;
PGraphics pg;
PGraphics mask;
boolean isRotating = false;
float angleDelta = PI / 10;
float angle = 0;
float angleDirection = 1;
int x,y;
void setup() {
  size(1000,1000);
  img = loadImage(imagePath);
  pg = createGraphics(width, height);
  mask = createGraphics(width, height);
  
  background(#e6e6e6); 
  image(img, 0,0, width, height);
}

void draw() {
  if (frameCount >= 60 * 3) {
    if (!isRotating) {
      step();
    } else {
      angle += angleDelta * angleDirection;
      translate(x, y);
      rotate(angle);
      image(pg, -x, -y, width, height);
      if (abs(angle) >= PI) {
        angle = 0;
        isRotating = false; 
      }
    }
  }
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

void step() {
  isRotating = true;
  boolean reroll = false;
  do {
    x = int(random(width));
    y = int(random(height));
    reroll = y < 300 && x < 260 ||  y < 330 && x > 700 ||  y > 760 && x > 680 ||  y > 830 && x < 190;
  } while(reroll);
  
  int[] arr = {height - y, y, width - x, x};
  int size = int(random(100, max(100, min(arr))));
  PImage canvas = get();
  pg.beginDraw();
  pg.image(canvas, 0, 0, width, height);
  mask.beginDraw();
  mask.stroke(255);
  mask.fill(255);
  mask.strokeWeight(0);
  mask.background(0);
  mask.circle(x, y, size);
  mask.endDraw();
  pg.mask(mask);
  pg.endDraw();
  angleDirection = random(1) < 0.5 ? 1 : - 1;
  
}

void mousePressed() {
  println("frameCount: " + frameCount);
  println(mouseX + "," + mouseY);
  
}