boolean isRunning = true;
int sunLocation = 0;
boolean shouldSaveFrame = false;
PImage[] skies;
PImage[] ground;
PImage[] buildings;
PImage[] sun;
PImage paper;
ArrayList<Building> blds = new ArrayList<Building>();
FlowField flowField;
void setup() {
  size(1920,1080, P2D);
  background(255);
  skies = loadFolder(sketchPath() + "/images/sky");
  ground = loadFolder(sketchPath() + "/images/grass");
  buildings = loadFolder(sketchPath() + "/images/buildings");
  sun = loadFolder(sketchPath() + "/images/sun");
  paper = loadImage(sketchPath() + "/images/paper.jpg");
  generate();
}

PImage[] loadFolder(String folderName) {
  File folder = new File(folderName);
  String[] filenames = folder.list();
  PImage[] arr = new PImage[filenames.length];
  for (int i = 0; i < filenames.length; ++i) {
    arr[i] = loadImage(folderName + "/" + filenames[i]);
  }
  return arr;
}
void generate() {
  // background(255);
  image(paper, 0,0,width, height);
  flowField = new FlowField(0.01);
  sunLocation = int( -0.1 * width);
  blds.clear();
  int x = int(width * - 0.1);
  int i = 0;
  while(x < width) {
    Building b = new Building(x, buildings[i], flowField, int(random(0, 300)));
    blds.add(b);
    boolean overlap = random(1) < 0.5;
    x +=  overlap ? random(0.7 * b.w, 0.9 * b.w) : random(1.2 * b.w, 1.4 * b.w);
    i = (i + 1) % buildings.length;
    
  }
}

PImage getTile(int x, int y) {
  PImage[] arr = null;
  if (y >  height * 0.75) {
    arr = ground;
  } else if (y < 0.15 * height && x > sunLocation - 0.1 * width && x < sunLocation + 0.1 * width) {
    arr = sun;
  } else {
    arr = skies;
  }
  PImage img = createImage(int(random(40, 100)), int(random(40, 60)), ARGB);
  PImage randomImage = arr[int(random(arr.length))];
  img.copy(randomImage, int(random(width - img.width)), int(random(height - img.height)), img.width, img.height, 0, 0, img.width, img.height);
  return img;
}

void putTile(int x, int y) {
  tint(255,120);
  PImage img = getTile(x, y);
  pushMatrix();
  translate(x,y);
  rotate(flowField.get(x,y, 0,TWO_PI));
  image(img,img.width / 2, -img.height / 2, img.width, img.height);
  popMatrix();
}
void draw() {
  for (Building b : blds) {
    if (b.state == State.TEARED_DOWN && frameCount == 300 + b.delay) b.build();
  }
  for (int i = 0; i < 100; ++i) {
    int x = int(random( -0.25 * width, 1.25 * width));
    int y = int(random( -0.25 * height, 1.25 * height));
    putTile(x,y);   
  }
  tint(255,255);
  for (Building b : blds) {
    b.step();
    b.draw();
  }
  
  sunLocation++;
  if (sunLocation > 1.25 * width) {
    sunLocation = int( -0.25 * width);
  }
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
  // flowField.step();
}

void keyPressed() {
  generate();
  isRunning = true;
  loop();
  
}
void mousePressed() {
  println("frameCount : " + frameCount);
  isRunning = !isRunning;
  if (isRunning) loop(); else noLoop();
}
