
boolean shouldSaveFrame = true;
int RECT_FRAMES = 200;
int BUILDING_FRAMES = 120;
int CLOUD_FRAMES = 120;
int buildingStartFrame = 10;
ArrayList<Rect> rects = new ArrayList<Rect>();
ArrayList<Building> buildings = new ArrayList<Building>();
ArrayList<Cloud> clouds = new ArrayList<Cloud>();

void setup() {
  size(1920,1920);
  frameRate(30);
  rectMode(CENTER);
  spawnRect();
  spawnCloud();
  rects.get(0).s = width;
}

void draw() {
  background(#e6e6e6); 
  if (frameCount % RECT_FRAMES == 0) {
    spawnRect();
  } 
  if (frameCount >= buildingStartFrame && (frameCount - buildingStartFrame) % BUILDING_FRAMES == 0) {
    spawnBuilding();
  }
  
  if (frameCount % CLOUD_FRAMES == 0) {
    spawnCloud();
  } 
  
  
  for (Rect r : rects) {
    r.step();
    r.draw();
  }
  
  for (Cloud c : clouds) {
    c.step();
    c.draw();
  }
  
  for (Building b : buildings) {
    b.step();
    b.draw();
  }
  
  
  
  if (shouldSaveFrame) {
    saveFrame("output2/frame-######.png");
  }
  if (frameCount == 30 * 60 * 2) {
    noLoop();
  }
}

void spawnRect() {
  color c = rectColors[rectColorIndex];
  rects.add(new Rect(c, width / 2, height / 2));
  rectColorIndex = (rectColorIndex + 1) % rectColors.length;
  
}

void spawnCloud() {
  color c = cloudColors[cloudColorIndex];
  boolean ltr = random(1) < 0.5;
  int speed = int(random(2, 5)) * (ltr ? 1 : - 1);
  clouds.add(new Cloud(int(random(height * 0.1, height * 0.3)), int(ltr ? - 0.2 * width : 1.2 * width), speed, c));
  cloudColorIndex = (cloudColorIndex + 1) % cloudColors.length;
}

void spawnBuilding() {
  for (int i = 0; i < 1; ++i) {
    color c = buildingColors[buildingColorIndex];
    buildings.add(new Building(c, int(random((0.2 * width), 0.8 * width)), int(random(height * 0.7, height)), int(width * 0.2)));
    buildingColorIndex = (buildingColorIndex + 1) % buildingColors.length;
  }
}

color[] rectColors = {#696969, #77ba1d, #7ec864, #869664, #9364c8, #956432, #9ac6da, #9ceedd, #9e9eaa, #a1a164, #b1c8ff, #6e6e28, #999900, #8b3027};
int rectColorIndex = int(random(rectColors.length));
color[] buildingColors = {#606e32, #760000, #7bc800,  #7f4502, #8f2a91, #9600b1, #aad16a, #ae2974,  #b0c1c3};
int buildingColorIndex = int(random(buildingColors.length));
color[] cloudColors = {#5e5bc5, #606e32, #706419, #7bc800, #87716f, #9364c8, #a2a3eb,  #a8c832, #b1c8ff};
int cloudColorIndex = int(random(cloudColors.length));