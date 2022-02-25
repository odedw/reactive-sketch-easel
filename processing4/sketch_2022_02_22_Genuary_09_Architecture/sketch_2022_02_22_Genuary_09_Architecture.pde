int padding;

boolean shouldSaveFrame = false;
Tile sky, ground;
Tile[] skies = new Tile[3];
ArrayList<Tile> buildings = new ArrayList<Tile>();
void setup() {
  size(1000,1000);
  padding = width / 10;
  generate();
}
void generate() {
  // sky = new Tile(sketchPath() + "/images/sky", 0, 0, width, height * 2 / 3);
  for (int i = 0; i < skies.length; ++i) {
    skies[i] = new Tile(sketchPath() + "/images/sky", 0, 0, width, height * 2 / 3, true);
  }
  ground = new Tile(sketchPath() + "/images/grass", 0, height * 2 / 3, width, height / 3, true);
  
  buildings.clear();
  int numBuildings = 5;//int(random(10, 15));
  for (int i = 0; i < numBuildings; ++i) {
    
    int h = int(random(height / 5, height * 4 / 5));
    int w = int(random(width / 7, width / 4));
    int x = int(random(padding, width - padding - w));
    Tile b = new Tile(sketchPath() + "/images/buildings", x,height - h, w, h, false);
    buildings.add(b);
    x += w + random( -padding, padding);
  }
}

void draw() {
  background(255);
  tint(255,120);
  for (Tile s : skies) {
    s.draw();
  }
  // sky.draw();
  tint(255, 255);
  ground.draw();
  for (Tile b : buildings) {
    b.draw();
  }
  
  
  
  noLoop();
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

void keyPressed() {
  generate();
  loop();
}