class Cell{
  int row,col,s, v;
  boolean isFlashing = false;
  Cell(int r, int c, int s_,int v_) {
    row = r;
    col = c;
    s = s_;
    v = v_;
  }
  
  void flash() {
    isFlashing = true;
  }
  
  void step() {
    // if (isFlashing) {
    //   isFlashing = false;
    //   v = 0;
    // } else {
    v++;
    // if (v == STEPS) {
    // flash();
    // }
    // }
  }
  
  void draw() {
    
    pushMatrix();
    translate(row * s, col * s);
    textSize(30);
    stroke(0);
    strokeWeight(1);    
    // noStroke();
    
    if (v == STEPS - 1) {
      fill(255);
    } else {
      fill(v * STEP);
    }
    // println(str(row) + "," + str(col) + " | " + str(v));
    square(0,0,s);
    // fill(v > STEPS / 2 ? 0 : 255);
    // text(isFlashing ? "Flash" : str(v), 0,s);
    popMatrix();
  }
}