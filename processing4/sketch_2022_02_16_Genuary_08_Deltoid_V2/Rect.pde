class Rect{
  int x,y,w,h;
  Rect(int x, int y, int w, int h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  boolean contains(int x, int y) {
    return x >= this.x && x < this.x + this.w && y >= this.y && y< this.y + this.h;
  }
}