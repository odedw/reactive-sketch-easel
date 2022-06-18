
boolean shouldSaveFrame = false;

int STEPS = 9;
int FLASH_AMOUNT = 100;
int STEP = (256 - FLASH_AMOUNT) / STEPS;
int SIZE = 10;
Cell[][] matrix;
int rows,cols;

void setup() {
  size(1000,1000);
  println(str(STEP));
  
  
  frameRate(30);
  rows = width / SIZE;
  cols = height / SIZE;  
  matrix = new Cell[rows][cols];
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      matrix[i][j] = new Cell(i, j, SIZE, int(random(STEPS - 1)));
    }
  }
}

void flash(int row, int col) {
  matrix[row][col].v = 0;
  
  ArrayList<Coordinate> neighbors = getNeighbors(matrix, row, col);      
  for (Coordinate c : neighbors) {
    if (matrix[c.row][c.col].v != 0) {
      matrix[c.row][c.col].step();
    }
  }
  for (Coordinate c : neighbors) {
    if (matrix[c.row][c.col].v > STEPS) {
      flash(c.row,c.col);
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
  
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      if (matrix[i][j].v > STEPS) {
        flash(i, j);        
      }
    }
  }
  
  // noLoop();
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

boolean running = true;
void mousePressed() {
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      matrix[i][j].v =  int(random(STEPS - 1));
      
    } 
  }
  //loop();
  //if (running) {
  //noLoop();
  //} else {
  //loop();
  //}
  //running = !running;
  //println("frameCount: " + frameCount);
}
