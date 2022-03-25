
boolean shouldSaveFrame = true;
int spawnRectFrames = 60;
int spawnBuildingFrames = 300;
int buildingStartFrame = 50;
int spawnRiverFrame = 350;
int riverStartFrame = 150;


ArrayList<Rect> rects = new ArrayList<Rect>();
ArrayList<Building> buildings = new ArrayList<Building>();
ArrayList<River> rivers = new ArrayList<River>();
color randomColor(color[] arr) {
  return arr[int(random(arr.length))];
}
void setup() {
  size(1820,1820);
  rectMode(CENTER);
  frameRate(30);
  spawnRect();
}

void spawnRiver() {
  color c = riverColors[riverColorIndex];
  int direction = random(1)<0.5 ? 1 :-  1;
  rivers.add(new River(c, int(height * 0.2), int(height * 0.15), direction));
  rivers.add(new River(c, int(height * 0.7), int(height * 0.15), direction));
  riverColorIndex = (riverColorIndex + 1) % riverColors.length;
}

void spawnRect() {
  color c = rectColors[rectColorIndex];
  rects.add(new Rect(c, width / 2, height / 2));
  rectColorIndex = (rectColorIndex + 1) % rectColors.length;
}

void spawnBuilding() {
  color c = buildingColors[buildingColorIndex];
  buildings.add(new Building(c, int(0.2 * width) , int(width * 0.2)));
  buildings.add(new Building(c, int(0.6 * width) , int(width * 0.2)));
  buildingColorIndex = (buildingColorIndex + 1) % buildingColors.length;
}

void draw() {
  if (frameCount % spawnRectFrames == 0) {
    spawnRect();
  } 
  if ((frameCount - buildingStartFrame) % spawnBuildingFrames == 0) {
    spawnBuilding();
  }
  if ((frameCount - riverStartFrame) % spawnRiverFrame == 0) {
    spawnRiver();
  }
  background(255); 
  
  for (Rect r : rects) {
    r.step();
    r.draw();
  }
  
  for (River r : rivers) {
    r.step();
    r.draw();
  }
  
  for (Building b : buildings) {
    b.step();
    b.draw();
  }
  
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
  
  if (frameCount == 30 * 60 * 2) {
    noLoop();
  }
}

void mousePressed() {
  println("frameCount: " + frameCount);
  println("frameRate: " + frameRate);
}

color[] rectColors = {#696969, #77ba1d, #7ec864, #869664, #9364c8, #956432, #9ac6da, #9ceedd, #9e9eaa, #a1a164, #b1c8ff, #6e6e28, #999900, #8b3027};
int rectColorIndex = int(random(rectColors.length));
color[] buildingColors = {#606e32, #760000, #7bc800,  #7f4502, #8f2a91, #9600b1, #aad16a, #ae2974,  #b0c1c3};
int buildingColorIndex = int(random(buildingColors.length));
color[] riverColors = {#5e5bc5, #606e32, #706419, #7bc800, #87716f, #9364c8, #a2a3eb,  #a8c832, #b1c8ff};
int riverColorIndex = int(random(riverColors.length));
color[] dotsColors = {#696969, #760000, #77ba1d, #87716f, #956432, #a8c832,  #b57b00};

/*
bridge : #5e5bc5
bush: #606e32
clouds : #696969
dirt: #6e6e28
fence : #706419
flower : #760000
fog : #77ba1d
grass : #7bc800
gravel : #7c32c8
ground - other : #7d3054
hill: #7ec864
house : #7f4502
mountain : #869664
mud : #87716f
pavement : #8b3027
platform : #8f2a91
river : #9364c8
road: #946e28
rock: #956432
roof: #9600b1
sand: #999900
sea : #9ac6da
sky : #9ceedd
snow: #9e9eaa
stone : #a1a164
straw : #a2a3eb
tree: #a8c832
wall- brick : #aad16a
wall- stone : #ae2974
wall- wood : #b0c1c3
water : #b1c8ff
wood: #b57b00
*/
