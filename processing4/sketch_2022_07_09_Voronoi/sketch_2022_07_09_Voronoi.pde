
boolean SHOULD_SAVE_FRAME = false;
int NUM_seeds = 10000;
String IMAGE_FILE = "photo-1519428376293-4733053a9c4a.jpg";
// String IMAGE_FILE = "a4250136797_10.jpg";
PGraphics imageGraphics, buffer;
Seed[] seeds = new Seed[NUM_seeds];

void setup() {
  size(1000,1000);
  noStroke();
  buffer = createGraphics(width, height);
  
  // image
  imageGraphics = createGraphics(width, height);
  imageGraphics.beginDraw();
  imageGraphics.image(loadImage("data/" + IMAGE_FILE), 0, 0, width,height);
  imageGraphics.endDraw();
  
  // generate();
}

void generate() {
  for (int i = 0; i < NUM_seeds; ++i) {
    int x = int(random(0,width));
    int y = int(random(0,height));
    color c = imageGraphics.get(x,y); // color(random(255),random(255),random(255));
    seeds[i] = new Seed(x, y, c);
  }
}

Seed getClosestSeed(int x, int y) {
  Seed closestSeed = null;
  float minDist = Integer.MAX_VALUE;
  for (int i = 0; i < NUM_seeds; ++i) {
    Seed p = seeds[i];
    float distance = dist(x, y, p.x, p.y);
    if (distance < minDist) {
      minDist = distance;
      closestSeed = p;
    }
  }
  return closestSeed;
}

void draw() {
  println(frameCount);
  
  generate();
  
  voronoi(buffer, seeds);
  image(buffer, 0,0,width,height);
  // set pixels
  // int count = 0;
  // int lastPercentage = 0;
  // for (int i = 0; i < width; i++) {
  //   for (int j = 0; j < height; j++) {
  //     Seed closestSeed = getClosestSeed(i, j);
  //     set(i, j, closestSeed.c);
  //     count++;
  
  //     int newPercentage = int(100 * count / (height * width));
  //     if (newPercentage != lastPercentage) {
  //       println(newPercentage);
  //       lastPercentage = newPercentage;
  //     }
  //   }
  
  //for (int i = 0; i < NUM_seeds; ++i) {
  //Seed p = seeds[i];
  //fill(p.c);    
  //circle(p.x, p.y, 5);
  // }
  
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
