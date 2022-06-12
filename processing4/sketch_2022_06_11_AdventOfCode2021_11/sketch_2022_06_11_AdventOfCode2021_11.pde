
boolean shouldSaveFrame = false;

int STEPS = 9;
int STEP = 256 / STEPS;
int SIZE = 10;
Cell[][] matrix;
int rows,cols;

void setup() {
  size(1000,1000);
  
  rows = width / SIZE;
  cols = height / SIZE;  
  matrix = new Cell[rows][cols];
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      matrix[i][j] = new Cell(i * SIZE, j * SIZE, SIZE, int(random(STEPS)));
    }
  }
  
}

void draw() {
  background(0); 
  
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      matrix[i][j].step();
    }
  }
  
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      matrix[i][j].draw();
    }
  }
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

boolean running = true;
void mousePressed() {
  if (running) {
    noLoop();
  } else {
    loop();
  }
  running = !running;
  println("frameCount: " + frameCount);
}
