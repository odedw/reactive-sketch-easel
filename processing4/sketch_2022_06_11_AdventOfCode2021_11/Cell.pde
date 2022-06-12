class Cell{
  int x,y,s, v;
  Cell(int x_, int y_, int s_,int v_) {
    x = x_;
    y = y_;
    s = s_;
    v = v_;
    println(v * STEP);
  }
  
  void step() {
    
  }
  
  void draw() {
    fill(v * STEP);
    noStroke();
    pushMatrix();
    translate(x, y);
    square(0,0,s);
    popMatrix();
  }
}