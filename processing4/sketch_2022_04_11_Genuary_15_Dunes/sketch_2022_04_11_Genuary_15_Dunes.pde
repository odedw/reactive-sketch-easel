
boolean shouldSaveFrame = false;

PImage sky;
color[] sunny = {#EDB055, #F9C268, #F2B759, #E5A448};
color[] shaded = {#AF6C28, #995B22, #CE883C,#9B5C21};
int index;
void setup() {
  size(1000,1000);
  
  sky = loadImage("data/guillaume-galtier-3YrppYQPoCI-unsplash.jpg");
  background(255); 
  // strokeWeight(2);
  // stroke(0);
  image(sky, 0, 0, width, height);
  Dune dune = new Dune();
  PGraphics dunePg = dune.create();
  image(dunePg, 0, height - dune.h, dune.w, dune.h);
}

color randomColor(color[] colors) {
  return colors[int(random(colors.length))];
}
void draw() {
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

boolean running = true;
void mousePressed() {
  // if (running) {
  //   noLoop();
  // } else{
  //   loop();
  // }
  // running = !running;
  // println("frameCount: " + frameCount);
  
  // PVector closest = findClosestPointOnBezierByY(mouseY);
  // if (closest.x < mouseX) {
  //   println("right");
  // } else 
  // {
  //   println("left");
  // }
}
