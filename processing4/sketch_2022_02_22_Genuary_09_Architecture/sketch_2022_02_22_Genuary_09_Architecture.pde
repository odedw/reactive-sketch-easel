// int padding;
boolean isRunning = true;

boolean shouldSaveFrame = false;
// Tile sky, ground;
// Tile[] skies = new Tile[3];
// ArrayList<Tile> buildings = new ArrayList<Tile>();
PImage[] skies;
PImage[] ground;
FlowField flowField;
void setup() {
  size(1000,1000);
  background(255);
  
  // padding = width / 10;
  
  String folderName = sketchPath() + "/images/sky";
  File folder = new File(folderName);
  String[] filenames = folder.list();
  skies = new PImage[filenames.length];
  for (int i = 0; i < filenames.length; ++i) {
    skies[i] = loadImage(folderName + "/" + filenames[i]);
  }
  
  folderName = sketchPath() + "/images/grass";
  folder = new File(folderName);
  filenames = folder.list();
  ground = new PImage[filenames.length];
  for (int i = 0; i < filenames.length; ++i) {
    ground[i] = loadImage(folderName + "/" + filenames[i]);
  }
  
  generate();
}
void generate() {
  flowField = new FlowField(0.01);
  
  // sky = new Tile(sketchPath() + "/images/sky", 0, 0, width, height * 2 / 3);
  // for (int i = 0; i < skies.length; ++i) {
  //   skies[i] = new Tile(sketchPath() + "/images/sky", 0, 0, width, height * 2 / 3, true);
  // }
  // ground = new Tile(sketchPath() + "/images/grass", 0, height * 2 / 3, width, height / 3, true);
  
  // buildings.clear();
  // int numBuildings = 5;//int(random(10, 15));
  // for (int i = 0; i < numBuildings; ++i) {
  
  //   int h = int(random(height / 5, height * 4 / 5));
  //   int w = int(random(width / 7, width / 4));
  //   int x = int(random(padding, width - padding - w));
  //   Tile b = new Tile(sketchPath() + "/images/buildings", x,height - h, w, h, false);
  //   buildings.add(b);
  //   x += w + random( -padding, padding);
  // }
}

void draw() {
  tint(255,120);
  for (int i = 0; i < 100; ++i) {
    PImage img = createImage(int(random(40, 100)), int(random(40, 60)), ARGB);
    int x = int(random( -0.25 * width, 1.25 * width));
    int y = int(random( -0.25 * height, 1.25 * height));
    PImage[] arr = y > height * 0.66 ? ground : skies;
    PImage randomImage = arr[int(random(arr.length))];
    img.copy(randomImage, int(random(width - img.width)), int(random(height - img.height)), img.width, img.height, 0, 0, img.width, img.height);
    pushMatrix();
    translate(x,y);
    rotate(flowField.get(x,y, -HALF_PI / 2,HALF_PI / 2));
    image(img, img.width / 2, -img.height / 2, img.width, img.height);
    popMatrix();
    
  }
  //tint(255,120);
  //for (Tile s : skies) {
  //s.draw();
  // }
  //// sky.draw();
  //tint(255, 255);
  //ground.draw();
  //for (Tile b : buildings) {
  //b.draw();
  // }
  
  
  // noLoop();
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

void keyPressed() {
  generate();
  background(255);
  isRunning = true;
  loop();
  
}
void mousePressed() {
  println("frameCount: " + frameCount);
  isRunning = !isRunning;
  if (isRunning) loop(); else noLoop();
}
