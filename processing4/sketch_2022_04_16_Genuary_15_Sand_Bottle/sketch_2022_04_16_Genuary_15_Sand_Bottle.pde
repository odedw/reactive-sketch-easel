import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

boolean shouldSaveFrame = false;
Box2DProcessing box2d;		
ArrayList<Grain> grains;
int generated;
int waiting = 0;
boolean isWaiting = false;
int GRAINS_PER_COLOR = 1000;
int GAP_FRAMES = 600;
color[] colors = {#355590, #6ca0a7, #ffc789, #df5f50, #5a3034, #fff1dd};
int colorIndex = 0;
int spawnX;
OpenSimplexNoise xNoise = new OpenSimplexNoise();
ArrayList<Integer> xValues = new ArrayList<Integer>();
SquareContainer container;
// Background bg;
boolean shouldStop = false; 
void setup() {
  size(800,800);
  box2d = new Box2DProcessing(this);	
  box2d.createWorld();
  
  grains = new ArrayList<Grain>();
  container = new SquareContainer(width / 2, height * 0.5 , 800);
  spawnX = int(container.x);
  xValues.add(spawnX);
  // bg = new Background();
}

void draw() {
  // bg.draw();
  background(200);
  box2d.step();  
  container.draw();
  
  if (!shouldStop) {
    generateGrains();
  }
  
  
  // Display all the boxes
  for (int i = grains.size() - 1; i >= 0; i--) {
    Grain g = grains.get(i);
    Vec2 pos = box2d.getBodyPixelCoord(g.body);		
    if (pos.x > width || pos.x < 0) {
      grains.remove(i);
      continue;
    } 
    g.step();
    g.draw();
  }
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
boolean debug = false;
void mousePressed() {
  
  if (!shouldStop) {
    shouldStop = true;
    return;
  }
  
  saveLocation();
  
  
}

void generateGrains() {
  if (colorIndex < colors.length) {
    generateX();
    
    for (int i = 0; i < 3; ++i) {
      Grain g = new Grain(spawnX, container.y - container.size / 2, colors[colorIndex]);
      grains.add(g);
      generated++;
    }
    
    if (generated >= GRAINS_PER_COLOR) {
      colorIndex = (colorIndex + 1) % colors.length;
      generated = 0;
    }
  } 
}

void saveLocation() {
  JSONObject json = new JSONObject();
  JSONArray xarr = new JSONArray();
  for (int i = 0; i < xValues.size(); i++) {
    xarr.setInt(i, xValues.get(i));
  }
  json.setJSONArray("xValues", xarr);
  JSONArray positions = new JSONArray();
  for (int i = 0; i < grains.size(); i++) {
    JSONObject pos = new JSONObject();
    Vec2 coord = box2d.getBodyPixelCoord(grains.get(i).body);
    pos.setInt("x", int(coord.x));
    pos.setInt("y", int(coord.y));
    positions.setJSONObject(i, pos);
  }
  json.setJSONArray("positions", positions);
  
  saveJSONObject(json, "data/run.json");
  println("saved");
}


void generateX() {
  float noiseScale = 0.003;
  float noiseValue = (float) xNoise.eval(frameCount * noiseScale, 0, 0);
  spawnX = int(map(noiseValue, -1, 1, 0, width));
  
  
  xValues.add(spawnX);
}
