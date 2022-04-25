import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

int RENDER_EVERY = 1;
int GAP_FRAMES = 600;
int GRAIN_SIZE = 3;
boolean shouldSaveFrame = true;
int[] topStaticY;

Box2DProcessing box2d;		
ArrayList<Grain> grains;
int waiting = 0;
boolean isWaiting = false;

PImage img;
int spawnX, spawnY;
OpenSimplexNoise xNoise = new OpenSimplexNoise();
ArrayList<Integer> xValues = new ArrayList<Integer>();
SquareContainer container;
// Background bg;
boolean shouldStop = false; 
JSONArray positions;
ColorDecider cd;
int index;
void setup() {
  size(750,750);
  JSONObject json = loadJSONObject("data/run-full.json");
  positions = json.getJSONArray("positions");
  cd = new ColorDecider("michele-caliani-iLAAT1E-H_8-unsplash.png", positions);
  //cd = new ColorDecider(null, null);
  
  box2d = new Box2DProcessing(this);	
  box2d.createWorld();
  
  grains = new ArrayList<Grain>();
  container = new SquareContainer(width / 2, height * 0.5 , width);
  spawnX = int(container.x);
  // println("var: " + (width / GRAIN_SIZE) * (height / GRAIN_SIZE));
  
  topStaticY = new int[width];
  for (int i = 0; i < width; ++i) {
    topStaticY[i] = height;
  }
  spawnY = int(container.y - container.size / 2);
}
void draw() {
  box2d.step();  
  
  if (!shouldStop) {
    generateGrains();
  } else {
    boolean shouldSave = true;
    for (Grain g : grains) {
      if (g.body.getType() != BodyType.STATIC) {
        shouldSave = false;        
        break;
      }
    }
    if (shouldSave) {
      println("saving");
      saveLocation();
      noLoop();
    }
  }
  
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
      topStaticY[int(pos.x)] = min(topStaticY[int(pos.x)], int(pos.y));
    }
    
    if (pos.x > width || pos.x < 0) {
      box2d.destroyBody(grains.get(i).body);
      grains.remove(i);
      continue;
    } 
    g.step();
    if (frameCount % RENDER_EVERY == 0) {            
      g.draw();
    }
  }
  
  shouldStop = true;
  for (int i = 0; i < width; ++i) {
    if (topStaticY[i] > 0) {
      shouldStop = false;
      break;
    }
  }
  if (shouldStop) {
    noLoop();
    // saveLocation();
  }
  // if (!shouldStop && grains.size() >= (width / GRAIN_SIZE) * (height / GRAIN_SIZE)) {
  //   println("stopping");
  //   shouldStop = true;
  // }
  
  
  if (frameCount % 500 == 0) {
    println("grains: " + grains.size() + ", " + dynamicCount + " dynamic, " + nf(float(dynamicCount) / grains.size(), 0, 2) + " ratio");
  }
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
boolean debug = false;
void mousePressed() {
  //if (!shouldStop) {
  //shouldStop = true;
  //return;
  // }
  println("topStaticY[mouseX]: " + topStaticY[mouseX]);
  saveLocation();
}

void generateGrains() {
  // run from file
  if (positions != null) {
    if (index >= positions.size()) {
      return;
    }
    for (int i = 0; i < 3; ++i) {
      Grain g = new Grain(positions.getJSONObject(index).getInt("startX"), spawnY, cd.getColor(index));
      grains.add(g);
      index++;
    }
    return;
  }
  
  
  for (int i = 0; i < 1000; ++i) {
    generateX(i);
    if (spawnX >= 0 && spawnX < width && topStaticY[spawnX] > 0) {
      break;
    } 
    if (i == 999) {
      println("skipped");
      return;
    }
  }
  // don't spawn if the top is above the edge
  // if (spawnX < 0 || spawnX >= width || topStaticY[spawnX] < 0) {
  // return;
  // }
  for (int i = 0; i < 3; ++i) {
    Grain g = new Grain(spawnX, spawnY, cd.getColor(grains.size()));
    grains.add(g);
  }
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


void generateX(int i) {
  float noiseScale = 0.003;
  float noiseValue = (float) xNoise.eval(frameCount * noiseScale, i, 0);
  spawnX = int(map(noiseValue, -1, 1, -0.2 * width, 1.2 * width));
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
