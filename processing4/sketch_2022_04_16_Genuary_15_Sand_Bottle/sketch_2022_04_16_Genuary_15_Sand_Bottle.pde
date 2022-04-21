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
float generatedX;
SquareContainer container;
Background bg; 
void setup() {
  size(600,600);
  box2d = new Box2DProcessing(this);	
  box2d.createWorld();
  
  grains = new ArrayList<Grain>();
  container = new SquareContainer(width / 2, height * 0.4 , 150);
  generatedX = container.x;
  bg = new Background();
}

void draw() {
  bg.draw();
  box2d.step();  
  container.draw();
  
  generateGrains();
  
  
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

void generateGrains() {
  if (colorIndex < colors.length) {
    for (int i = 0; i < 2; ++i) {
      Grain g = new Grain(generatedX, container.y - container.size, colors[colorIndex]);
      grains.add(g);
      generated++;
    }
    
    if (generated >= GRAINS_PER_COLOR) {
      colorIndex++;
      generated = 0;
      // generatedX = random(bottle.p2.x, bottle.p4.x);
    }
  } 
}

