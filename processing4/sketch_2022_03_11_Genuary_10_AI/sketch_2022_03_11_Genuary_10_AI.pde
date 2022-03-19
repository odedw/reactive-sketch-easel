
boolean shouldSaveFrame = true;
int spawnRectFrames = 60;
int spawnBuildingFrames = 130;
int buildingStartFrame = 50;
int spawnRiverFrame = 350;
int riverStartFrame = 150;


ArrayList<Rect> rects = new ArrayList<Rect>();
ArrayList<Building> buildings = new ArrayList<Building>();
ArrayList<River> rivers = new ArrayList<River>();
color[] rectColors = {#696969, #6e6e28, #77ba1d, #7bc800, #7d3054, #869664, #956432, #999900, #9ac6da, #9ceedd, #9e9eaa, #b57b00};
color[] buildingColors = {#7f4502, #aad16a, #ae2974, #b0c1c3, #a2a3eb,  #a1a164};
color[] riverColors = {#760000, #9364c8, #999900, #9ac6da, #9e9eaa, #b1c8ff, #5e5bc5, #606e32, #706419};
color randomColor(color[] arr) {
  return arr[int(random(arr.length))];
}
void setup() {
  size(1000,1000);
  rectMode(CENTER);
  frameRate(30);
  spawnRect();
  // spawnBuilding();
  // spawnRiver();
}

void spawnRiver() {
  rivers.add(new River(randomColor(riverColors), int(random(height * 0.2, height * 0.8)), int(height * 0.15), random(1)<0.5 ? 1 :-  1));
}

void spawnRect() {
  rects.add(new Rect(randomColor(rectColors), width / 2, height / 2));
}

void spawnBuilding() {
  buildings.add(new Building(randomColor(buildingColors), random(1) < 0.5 ? int(0.3 * width) : int(0.5 * width) , int(width * 0.2)));
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
  
  if (frameCount == 30 * 60) {
    noLoop();
  }
}

void mousePressed() {
  println("frameCount: " + frameCount);
  println("frameRate: " + frameRate);
}
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