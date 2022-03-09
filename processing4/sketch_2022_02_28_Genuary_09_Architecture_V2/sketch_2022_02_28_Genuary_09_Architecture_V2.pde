boolean shouldSaveFrame = false;
int maxObjects = 50;
int regenFrames = 430;
int cols = 80;
int rows = 80;
int size = 6;
int gap = 0;
int[][] heights;
int fullWidth = cols * size + gap * (cols - 1);
int fullHeight = rows * size + gap * (rows - 1);
float magicAngle = atan(cos(QUARTER_PI));
Pixel[][] pixels = new Pixel[cols][rows];
boolean[] pixelMap = new boolean[cols * rows];
ArrayList<CityObject> cityObjects = new ArrayList<CityObject>();
ArrayList<Road> roads = new ArrayList<Road>();
ArrayList<Car> cars = new ArrayList<Car>();
Factory factory = new Factory();
int pixelMapIndex(int i, int j) {
  return j * cols + i;
}
void setup() {
  size(1000,1000, P3D);
  smooth(32);
  // noStroke();
  strokeWeight(1);
  
  heights = new int[cols][rows];
  for (int i = 0; i < cols; ++i) {
    for (int j = 0; j < rows; ++j) {
      pixels[i][j] = new Pixel(i, j, size);//int(random(size, size * 10)));
    }
  }
  
  
  
  generate();
}

void generate() {
  cityObjects.clear();
  roads.clear();
  
  
  for (int i = 0; i < cols; ++i) {
    for (int j = 0; j < rows; ++j) {
      pixels[i][j].setHeight(size);
    }
  }
  
  for (int i = 0; i < pixelMap.length; ++i) {
    pixelMap[i] = false;
  }
  
  roads.add(new Road(int(cols * 0.25) - 2, 0, false));
  roads.add(new Road(int(cols * 0.75) - 2, 0, false));
  roads.add(new Road(0, int(rows * 0.25) - 2, true));
  roads.add(new Road(0, int(rows * 0.75) - 2, true));
  
  
  
  
  while(cityObjects.size() < maxObjects) {
    cityObjects.add(factory.createObject());
    // println("cityObjects.size(): " + cityObjects.size());
  }
}

void mousePressed() {
  println("mouseX: " + mouseX);
  println("mouseY: " + mouseY);
  
  
  println("frameCount: " + frameCount);
  generate();
}

void draw() {
  background(0);
  lights();
  pointLight(200, 200, 200, 10,30, 50);
  ortho( -400, 400, 400, -400, 0, 2000);
  translate(width / 2, height / 2);
  rotateX(magicAngle);
  rotateY( -QUARTER_PI);
  translate(0, -15,0);
  scale(1.1 + frameCount / 6500.0);
  
  if (frameCount % regenFrames == 0) {
    generate();
  }
  
  // generate car
  if (frameCount % 100 == 0) {
    Road road = roads.get(int(random(roads.size())));
    println("road.col: " + road.col);
    cars.add(new Car(road.col + (road.horizontal ? 0 : 1), road.row + (road.horizontal ? 1 : 0), road.horizontal));
  }
  
  for (Car c : cars) {
    c.step();
  }
  
  for (int i = 0; i < cols; ++i) {
    for (int j = 0; j < rows; ++j) {
      pixels[i][j].step();
      pixels[i][j].draw();
    }
  }
  // noStroke();
  // rotateY(frameCount / 100.0);
  // fill(0,0,0,50);
  // box(1, height, width);
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
