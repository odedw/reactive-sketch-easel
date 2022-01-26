class Rect{
  float x,y,w,h;
  Rect(float x, float y, float w, float h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  boolean contains(float x, float y) {
    return x >= this.x - this.w / 2 && x <= this.x + this.w / 2 && y >= this.y - this.h / 2 && y <= this.y + this.h / 2;
  }
}