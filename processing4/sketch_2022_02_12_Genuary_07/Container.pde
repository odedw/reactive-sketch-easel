public enum Direction {
  HORIZONTAL,
  VERTICAL,
  LEFT_DIAGONAL,
  RIGHT_DIAGONAL
}

class Container{
  color c;
  int x,y,w,h;
  Direction d;
  Container(color c, int x, int y, int w, int h, Direction d) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.d = d;
  }
  
  void update() {
    
  }
  
  void draw() {
    strokeWeight(1);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
    strokeWeight(STROKE);
    stroke(this.c);
    int y = this.y;
    while(y < this.y + this.h) {
      line(this.x, y, this.x + this.w, y);
      y = y + STROKE + GAP;
    }
  }
}