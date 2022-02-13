int GAP = 8;
int STROKE = 2;
int quarter, sixth;
Container[] containers = new Container[32];
void setup() {
  size(1200,1200);
  background(255); 
  
  quarter = width / 4;
  sixth = width / 6;
  strokeWeight(STROKE);
  // first row
  containers[0] = new Container(color(0), 0, 0, quarter, height / 4, Direction.HORIZONTAL);
  containers[1] = new Container(color(255,0,0), quarter, 0, quarter, height / 4, Direction.VERTICAL);
  containers[2] = new Container(color(255,255,0), quarter * 2, 0, quarter, height / 4, Direction.LEFT_DIAGONAL);
  containers[3] = new Container(color(0,0,255), quarter * 3, 0, quarter, height / 4, Direction.RIGHT_DIAGONAL);
  
  // second row
  containers[4] = new Container(color(0), 0, height / 4, sixth, height / 4, Direction.HORIZONTAL);
  containers[5] = new Container(color(255,0,0), 0, height / 4, sixth, height / 4, Direction.VERTICAL);
  
  containers[6] = new Container(color(0), sixth, height / 4, sixth, height / 4, Direction.HORIZONTAL);
  containers[7] = new Container(color(255,0,0), sixth, height / 4, sixth, height / 4, Direction.VERTICAL);
  
  containers[8] = new Container(color(0), sixth * 2, height / 4, sixth, height / 4, Direction.HORIZONTAL);
  containers[9] = new Container(color(255,0,0), sixth * 2, height / 4, sixth, height / 4, Direction.VERTICAL);
  
  containers[10] = new Container(color(0), sixth * 3, height / 4, sixth, height / 4, Direction.HORIZONTAL);
  containers[11] = new Container(color(255,0,0), sixth * 3, height / 4, sixth, height / 4, Direction.VERTICAL);
  
  containers[12] = new Container(color(0), sixth * 4, height / 4, sixth, height / 4, Direction.HORIZONTAL);
  containers[13] = new Container(color(255,0,0), sixth * 4, height / 4, sixth, height / 4, Direction.VERTICAL);
  
  containers[14] = new Container(color(0), sixth * 5, height / 4, sixth, height / 4, Direction.HORIZONTAL);
  containers[15] = new Container(color(255,0,0), sixth * 5, height / 4, sixth, height / 4, Direction.VERTICAL);
  
  // third row
  containers[16] = new Container(color(0), 0, height / 2, quarter, height / 4, Direction.HORIZONTAL);
  containers[17] = new Container(color(255,0,0), 0, height / 2, quarter, height / 4, Direction.VERTICAL);
  containers[18] = new Container(color(255,0,0), 0, height / 2, quarter, height / 4, Direction.VERTICAL);
  
  containers[19] = new Container(color(0), quarter, height / 2, quarter, height / 4, Direction.HORIZONTAL);
  containers[20] = new Container(color(255,0,0), quarter, height / 2, quarter, height / 4, Direction.VERTICAL);
  containers[21] = new Container(color(255,0,0), quarter, height / 2, quarter, height / 4, Direction.VERTICAL);
  
  containers[22] = new Container(color(0), quarter * 2, height / 2, quarter, height / 4, Direction.HORIZONTAL);
  containers[23] = new Container(color(255,0,0), quarter * 2, height / 2, quarter, height / 4, Direction.VERTICAL);
  containers[24] = new Container(color(255,0,0), quarter * 2, height / 2, quarter, height / 4, Direction.VERTICAL);
  
  containers[25] = new Container(color(0), quarter * 3, height / 2, quarter, height / 4, Direction.HORIZONTAL);
  containers[26] = new Container(color(255,0,0), quarter * 3, height / 2, quarter, height / 4, Direction.VERTICAL);
  containers[27] = new Container(color(255,0,0), quarter * 3, height / 2, quarter, height / 4, Direction.VERTICAL);
  
  // fourth row
  containers[28] = new Container(color(0), 0, 3 * height / 4, width, height / 4, Direction.HORIZONTAL);
  containers[29] = new Container(color(255,0,0), 0, 3 * height / 4, width, height / 4, Direction.VERTICAL);
  containers[30] = new Container(color(255,255,0),0, 3 * height / 4, width, height / 4, Direction.LEFT_DIAGONAL);
  containers[31] = new Container(color(0,0,255), 0, 3 * height / 4, width, height / 4, Direction.RIGHT_DIAGONAL);
  
}

void draw() {
  for (Container c : containers) {
    c.draw();
  }
}
