boolean SHOULD_SAVE_FRAME = true;
int NUM_SEEDS = 1000;
int NUM_COLS = 400;

// String FILENAME = "3207126071.mp4";
String FILENAME = "highway-with-cars-static.mp4";
String FILENAME_MAP = "highway-with-cars-static-dithered.mp4";
// String FILENAME = "A Group Of Ballerina Wearing A Phantom Mask Staging A Live Performance.mp4";
float CHANCE_TO_SEED = 0.1;
float THRESHOLD = 0.5;

ArrayList<Coordinate> seeds = new ArrayList<Coordinate>();
Video vid, mapVid;
PGraphics pg;
void setup() {
  size(1920,1080);
  vid = loadVideo(FILENAME);
  mapVid = loadVideo(FILENAME_MAP);
  pg = createGraphics(width, height);
}

void draw() {
  // background(#e6e6e6); 
  if (vid.frameAvailable() && mapVid.frameAvailable()) {
    drawFrame();
    vid.next();
    mapVid.next();
    if (SHOULD_SAVE_FRAME) {
      saveFrame("output/frame-######.png");
    }
  }
  
}

void drawFrame() {
  seeds.clear();
  
  Movie mov = vid.read();
  Movie mapMov = mapVid.read();
  for (int i = 0; i < width; ++i) {
    for (int j = 0; j < height; ++j) {
      if (mapMov.get(i,j) == #ffffff) {
        seeds.add(new Coordinate(i, j, mov.get(i,j)));
      }
      // float average = ((red(c) + green(c) + blue(c)) / 3.0) / 255;
      // if (average > THRESHOLD) {
      
      // if (random(1) < CHANCE_TO_SEED) {
      //   seeds.add(new Coordinate(i, j, c));
      // }
      // }
    }
  }
  
  //for (int i = 0; i < NUM_SEEDS; ++i) {
  //int x = int(random(0,width));
  //int y = int(random(0,height));
  //color c = mov.get(x,y); // color(random(255),random(255),random(255));
  //seeds.add(new Coordinate(x, y, c));
  // }
  
  //for (int i = 0; i < width; i += width / NUM_COLS) {
  //for (int j = 0; j < height; j += width / NUM_COLS) {
  //color c = mov.get(i,j);
  //float speed = random(1,10) * (random(1) > 0.5 ? 1 : - 1);
  //int x = i + int(sin(frameCount / speed) * 5.0);
  //x = clamp(x, 0, width - 1);
  //int y = j + int(cos(frameCount / speed) * 5.0);;
  //y = clamp(y, 0, height - 1);
  //seeds.add(new Coordinate(x, y, c));
  //}
  // }
  
  pg.beginDraw();
  pg.background(0);
  pg.noStroke();
  println(seeds.size());
  Voronoi voronoi = new Voronoi(pg, seeds);
  voronoi.run();
  pg.endDraw();
  image(pg, 0,0,width,height);
}

boolean running = true;
void mousePressed() {
  // // if (running) {
  // //   noLoop();
  // // } else {
  // //   loop();
  // // }
  // running = !running;
  THRESHOLD = float(mouseY) / height;
  println(THRESHOLD);
  println("frameCount: " + frameCount);
}
