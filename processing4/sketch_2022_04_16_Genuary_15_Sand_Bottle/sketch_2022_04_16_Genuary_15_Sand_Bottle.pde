import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

int RENDER_EVERY = 180;
int GRAIN_SIZE = 2;
int GRAINS_PER_COLOR = 5000;
int GRAINS_PER_FRAME = 3;
int FRAMES_BETWEEN_COLORS = 600;
boolean shouldSaveFrame = false;
int[] topStaticY;
int inactiveY;
int waiting = 0;
Spawner spawner = new Spawner();
Box2DProcessing box2d;		
ArrayList<Grain> grains;
boolean debug = false;
int maxStaticY = 0;

PImage img;
OpenSimplexNoise xNoise = new OpenSimplexNoise();
ArrayList<Integer> xValues = new ArrayList<Integer>();
SquareContainer container;
// Background bg;
boolean shouldStop = false; 
JSONArray positions;
ColorDecider cd;
int index;
void setup() {
  size(800,800);
  JSONObject json = loadJSONObject("data/run-full.json");
  // positions = json.getJSONArray("positions");
  // cd = new ColorDecider("czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGRmYW1vdXNhcnRpc3RzOC1wZGZhbW91c3BhaW50aW5nZXRjMTAxMDAwMTMtaW1hZ2VfMi5qcGc.jpg", positions);
  cd = new ColorDecider(null, null);
  
  box2d = new Box2DProcessing(this);	
  box2d.createWorld();
  
  grains = new ArrayList<Grain>();
  container = new SquareContainer(width / 2, height * 0.5 , width);
  // println("var: " + (width / GRAIN_SIZE) * (height / GRAIN_SIZE));
  
  topStaticY = new int[width];
  for (int i = 0; i < width; ++i) {
    topStaticY[i] = height;
  }
  spawner.spawnY = int(container.y - container.size / 2);
  
  maxStaticY = height + 1;
}
void draw() {
  if (debug) {
    println("frameCount: " + frameCount);
  }
  box2d.step();  
  
  spawner.step();
  
  if (frameCount % RENDER_EVERY == 0) {
    background(200);
    container.draw();
  }
  
  int dynamicCount = 0;
  // Display all the boxes
  for (int i = grains.size() - 1; i >= 0; i--) {
    Grain g = grains.get(i);
    Vec2 pos = box2d.getBodyPixelCoord(g.body);		
    
    if (g.body.getType() == BodyType.DYNAMIC) {
      dynamicCount++;
    } else {
      for (int x = floor(pos.x) - GRAIN_SIZE;x <= ceil(pos.x) + GRAIN_SIZE;x++) {
        if (x >= 0 && x < width && int(pos.y) < topStaticY[x]) {
          topStaticY[x] = int(pos.y);
        } 
      }
      
    }
    
    if (pos.x > width || pos.x < 0) {
      box2d.destroyBody(grains.get(i).body);
      grains.remove(i);
      continue;
    } 
    if (frameCount > 10 && pos.y > maxStaticY + 5) {
      // g.body.setActive(false);
      box2d.destroyBody(grains.get(i).body);
      grains.remove(i);
      continue;
    }
    
    g.step();
    if (frameCount % RENDER_EVERY == 0) {            
      g.draw();
    }
    
  }
  
  int newMaxStaticY = 0;
  for (int i = 0; i < width; ++i) {
    newMaxStaticY = max(newMaxStaticY, topStaticY[i]);
  }
  
  // println("newMaxStaticY: " + newMaxStaticY);
  if (maxStaticY > newMaxStaticY) {
    maxStaticY = newMaxStaticY;
    println("maxStaticY: " + maxStaticY);
  }
  if (maxStaticY < 0) {
    noLoop();
    // saveLocation();
  } 
  
  // if (!shouldStop && grains.size() >= (width / GRAIN_SIZE) * (height / GRAIN_SIZE)) {
  //   println("stopping");
  //   shouldStop = true;
  // }
  
  
  // if (frameCount % 500 == 0) {
  //   println("grains: " + grains.size() + ", " + dynamicCount + " dynamic, " + nf(float(dynamicCount) / grains.size(), 0, 2) + " ratio");
  // }
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
void mousePressed() {
  //if (!shouldStop) {
  //shouldStop = true;
  //return;
  // }
  debug = !debug;
  println("topStaticY[mouseX]: " + topStaticY[mouseX]);
  // saveLocation();
  saveFrame("output/frame-######.png");
  
}


void saveLocation() {
  JSONObject json = new JSONObject();
  JSONArray positions = new JSONArray();
  for (int i = 0; i < grains.size(); i++) {
    JSONObject pos = new JSONObject();
    Vec2 coord = box2d.getBodyPixelCoord(grains.get(i).body);
    pos.setInt("x", int(coord.x));
    pos.setInt("y", int(coord.y));
    pos.setInt("startX", int(grains.get(i).startX));
    positions.setJSONObject(i, pos);
  }
  json.setJSONArray("positions", positions);
  
  saveJSONObject(json, "data/run.json");
  println("saved");
}

int countDynamicBodies() {
  int res = 0;
  for (Grain g : grains) {
    if (g.body.getType() == BodyType.DYNAMIC) {
      res++;
    }
  }
  return res;
}
