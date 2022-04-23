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
color[] colors = {#294984, #6ca0a7, #ffc789, #df5f50, #5a3034, #fff1dd};
int colorIndex = 0;
int generatedX;
ArrayList<Integer> xValues = new ArrayList<Integer>();
SquareContainer container;
Background bg;
boolean shouldStop = false; 
void setup() {
  size(600,600);
  box2d = new Box2DProcessing(this);	
  box2d.createWorld();
  
  grains = new ArrayList<Grain>();
  container = new SquareContainer(width / 2, height * 0.5 , 300);
  generatedX = int(container.x);
  xValues.add(generatedX);
  bg = new Background();
}

void draw() {
  bg.draw();
  box2d.step();  
  container.draw();
  
  if (!shouldStop) {
    generateGrains();
  }
  
  
  // Display all the boxes
  for (Grain g : grains) {
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
    for (int i = 0; i < 2; ++i) {
      Grain g = new Grain(generatedX, container.y - container.size, colors[colorIndex]);
      grains.add(g);
      generated++;
    }
    
    if (generated >= GRAINS_PER_COLOR) {
      colorIndex = (colorIndex + 1) % colors.length;
      generated = 0;
      generatedX = int(random(container.x - container.size * 0.4, container.x + container.size * 0.4));
      xValues.add(generatedX);
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