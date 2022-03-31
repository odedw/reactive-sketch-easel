
boolean shouldSaveFrame = true;

int FRAMES_GROW = 100;
int FRAMES_ROTATE = 250;
int FRAMES_ROTATE_BACK = 200;
int FRAMES_SHRINK = 100;
int NUM_SQUARES = 25;
int INITIAL_SIZE = 50;
float ANGLE_DELTA = radians(10);
ArrayList<Square> squares = new ArrayList<Square>();
int squareIndex = 0;

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
  smooth(32);
}

void draw() {
  background(#e6e6e6); 
  
  if (frameCount < FRAMES_GROW) {
    for (Square s : squares) {
      s.s = map2(frameCount, 0, FRAMES_GROW, 0, s.targetS, CUBIC, EASE_OUT);
    }
  } else if (frameCount < FRAMES_ROTATE + FRAMES_GROW) {
    for (Square s : squares) {
      s.a = map2(frameCount - FRAMES_GROW, 0, FRAMES_ROTATE, 0, s.targetA, CUBIC, EASE_OUT);
    }
  } else if (frameCount < FRAMES_ROTATE + FRAMES_GROW + FRAMES_ROTATE_BACK) {
    for (Square s : squares) {
      s.a = map2(frameCount - FRAMES_GROW - FRAMES_ROTATE, 0, FRAMES_ROTATE_BACK, s.targetA, TWO_PI, CUBIC, EASE_OUT);
    }
  } else if (frameCount < FRAMES_ROTATE + FRAMES_GROW + FRAMES_ROTATE_BACK + FRAMES_SHRINK) {
    for (Square s : squares) {
      s.s = map2(frameCount - FRAMES_GROW - FRAMES_ROTATE - FRAMES_ROTATE_BACK, 0, FRAMES_SHRINK, s.s, 0, CUBIC, EASE_IN);
    }
  }
  
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
