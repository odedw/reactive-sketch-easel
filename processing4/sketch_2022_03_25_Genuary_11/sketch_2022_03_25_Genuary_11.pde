
boolean shouldSaveFrame = false;

int NUM_SQUARES = 25;
int INITIAL_SIZE = 50;
float ANGLE_DELTA = radians(10);
ArrayList<Square> squares = new ArrayList<Square>();
void setup() {
  size(1000,1000, P2D);
  rectMode(CENTER);
  float size = INITIAL_SIZE;
  float a = 0;
  for (int i = 0; i < NUM_SQUARES; ++i) {
    squares.add(new Square(size, i % 2 == 0 ? color(255) : color(0), a));
    a += ANGLE_DELTA;
    size = cos(ANGLE_DELTA) * size + sin(ANGLE_DELTA) * size;
  }
  smooth(16);
}

void draw() {
  background(255, 255, 255); 
  translate(width / 2, height / 2);
  for (int i = squares.size() - 1; i >= 0; --i) {
    Square s = squares.get(i);
    s.step();
    s.draw();
  }
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
