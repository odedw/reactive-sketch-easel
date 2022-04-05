import java.util.Collections;
OpenSimplexNoise noise = new OpenSimplexNoise();

boolean shouldSaveFrame = true;
boolean looping = true;
int CIRCLE_FRAME = 25;
ArrayList<Emitter> emitters = new ArrayList<Emitter>();
ArrayList<Circle> circles = new ArrayList<Circle>();
int colorIndex = 0;
// color[] colors = {#ff3232, #ff9932, #ffff32, #32ff32, #32ffff, #3232ff, #ff32ff};
color[] colors = {#f2eb8a, #fed000, #fc8405, #ed361a, #e2f0f3, #b3dce0, #4464a1, #203051, #ffc5c7, #f398c3, #cf3895, #6d358a, #06b4b0, #4b8a5f};
void setup() {
  size(800,80, P2D);
  smooth(16);
  // while(emitters.size() < 10) {
  //   PVector p = new PVector(random(width *-  0.25, width * 1.25), random(height *-  0.5, height * 1.5));
  //   if ((p.x < 0 || p.x > width) && (p.y < 0 || p.y > height)) {
  //     emitters.add(new Emitter(int(p.x), int(p.y)));
  //   }
  
  // }
  // emitters.add(new Emitter(width * (0.5), height * (1.2)));
  emitters.add(new Emitter(width * (0.5), height * (1.2)));
  emitters.add(new Emitter(width * (0.5), height * ( -0.2)));
  emitters.add(new Emitter(width * (1.1), height * (0.5)));
  emitters.add(new Emitter(width * ( -0.1), height * (0.5)));
  
  // emitters.add(new Emitter(width * ( -0.2), height * ( -1.2)));
  // emitters.add(new Emitter(width * ( -0.2), height * (2.2)));
  // emitters.add(new Emitter(width * (1.2), height * ( -1.2)));
  // emitters.add(new Emitter(width * (1.2), height * (2.2)));
  // emitters.add(new Emitter(width * (1.2), height * (2.2)));
  // emitters.add(new Emitter(width * (0.5), height * ( -1)));
  // emitters.add(new Emitter(width * (0.5), height * (2)));
  println("starting");
}

void draw() {
  background(0); 
  // for (Emitter e : emitters) {
  //   // e.step();
  //   // e.draw();
  // }
  // for (int i = 0; i < emitters.get(0).circles.size(); ++i) {
  //   for (Emitter e : emitters) {
  //     e.circles.get(i).draw();
  
  //   } 
  // }
  
  
  if (frameCount % CIRCLE_FRAME == 0) {
    // while(true) {
    //   PVector p = new PVector(random(width *-  0.25, width * 1.25), random(height *-  0.5, height * 1.5));
    //   if ((p.x < 0 || p.x > width) && (p.y < 0 || p.y > height)) {
    //     emitters.get(0).x = p.x;
    //     emitters.get(0).y = p.y;
    //     break;
    //   }
    
    // }
    
    // float n = (float) noise.eval(circles.size() / 20.0, 0,0);
    // float x = map(n, -1, 1, -0.5, 0.5);
    // // println("x: " + (x));
    // emitters.get(0).x = width * (x + 0.5);
    
    Collections.shuffle(emitters);
    for (Emitter e : emitters) {
      circles.add(new Circle(colors[colorIndex], e.x, e.y));
    }
    while(circles.size() > 50) {
      circles.remove(0);
    }
    colorIndex = (colorIndex + 1) % colors.length;
  }
  for (Circle c : circles) {
    c.step();
    c.draw();
  }
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

void mousePressed() {
  if (looping)
    noLoop();
  else 
    loop();
  println("circles.size(): " + circles.size());
  looping = !looping;
}