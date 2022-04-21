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
int GRAINS_PER_COLOR = 1500;
int GAP_FRAMES = 600;
color[] colors = {#294984, #6ca0a7, #ffc789, #df5f50, #5a3034, #fff1dd};
int colorIndex = 0;
float  generatedX;
PImage bg;
Bottle bottle;

void setup() {
  size(600,600);
  box2d = new Box2DProcessing(this);	
  box2d.createWorld();
  
  grains = new ArrayList<Grain>();
  bg = loadImage("henry-co--odUkx8C2gg-unsplash.jpg");
  bottle = new Bottle(width / 2, height * 0.75, 100, 300);
  
  generatedX = width / 2 + 50;
  // Grain g = new Grain(width / 2 - 10,height - 50);
  // grains.add(g);
}

void draw() {
  image(bg, 0,0,width, height); 
  box2d.step();  
  bottle.draw();
  if (colorIndex < colors.length && !isWaiting) {
    for (int i = 0; i < 2; ++i) {
      Grain g = new Grain(generatedX, height / 2 - 180, colors[colorIndex]);
      grains.add(g);
      generated++;
    }
    
    if (generated >= GRAINS_PER_COLOR) {
      colorIndex++;
      generated = 0;
      // generatedX = random(bottle.p2.x, bottle.p4.x);
    }
  } 
  
  // Display all the boxes
  int mobile = 0;
  for (Grain g : grains) {
    g.step();
    g.draw();
    if (g.body.getType() == BodyType.DYNAMIC) mobile++;
    
  }
  
  if (mobile == 0) {
    isWaiting = false;
  }
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

boolean debug = false;
void mousePressed() {
  
  // debug = !debug;
  explode();
  
}

void explode() {
  shouldSaveFrame = true;
  for (Grain g : grains) {
    g.body.setType(BodyType.DYNAMIC);
    g.stepsImmobile = 0;
  }
  
  // boundaries.get(1).b.setActive(false);
  // boundaries.get(2).b.setActive(false);
  // boundaries.remove(1);
  // boundaries.remove(1);
  
}
