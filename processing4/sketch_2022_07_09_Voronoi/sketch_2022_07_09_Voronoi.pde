
boolean SHOULD_SAVE_FRAME = false;
int NUM_SEEDS = 2;
Voronoi voronoi;
// String IMAGE_FILE = "photo-1519428376293-4733053a9c4a.jpg";
// String IMAGE_FILE = "photo-1444021465936-c6ca81d39b84.jpg";
String IMAGE_FILE = "adam-birkett-75EFpyXu3Wg-unsplash.jpg";
// String IMAGE_FILE = "photo-1510332981392-36692ea3a195.jpg";
// String IMAGE_FILE = "a4250136797_10.jpg";
PGraphics imageGraphics, buffer;
Coordinate[] seeds = new Coordinate[NUM_SEEDS];

void setup() {
  size(1000,1000);
  noStroke();
  buffer = createGraphics(width, height);
  buffer.noStroke();
  // image
  imageGraphics = createGraphics(width, height);
  imageGraphics.beginDraw();
  imageGraphics.image(loadImage("data/" + IMAGE_FILE), 0, 0, width,height);
  imageGraphics.endDraw();
  
  generate();
}

void generate() {
  for (int i = 0; i < NUM_SEEDS; ++i) {
    int x = int(random(0,width));
    int y = int(random(0,height));
    color c = imageGraphics.get(x,y); // color(random(255),random(255),random(255));
    seeds[i] = new Coordinate(x, y, c);
  }
  voronoi = new Voronoi(buffer, seeds);
}

int frames = 0;

void draw() {
  buffer.beginDraw();
  buffer.noStroke();
  
  frames++;
  boolean regen = !voronoi.step();
  
  
  buffer.endDraw();
  // regen = frames == 20;
  // if (regen) { 
  //   generate();
  //   println(frames);
  //   frames = 0;
  // }
  
  image(buffer, 0,0,width,height);
  
  
  if (SHOULD_SAVE_FRAME) {
    saveFrame("output/frame-######.png");
  }
}

boolean running = true;

void mousePressed() {
  //if (running) {
  //noLoop();
//} else {
  //loop();
//}
  //running = !running;
  println("frameCount: " + frameCount);
  generate();
  
}
