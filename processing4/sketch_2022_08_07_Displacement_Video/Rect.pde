class Rect{
  int x,y,w,h;
  Rect(float x, float y, float w, float h) {
    this.x = int(x);
    this.y = int(y);
    this.w = int(w);
    this.h = int(h);
  }
  
  Rect() {
    float min = 20;//width * 0.001;
    float max = 100;//width * 0.01;
    x = int(random(width * 0.3, width * 0.7));
    y = int(random(height * 0.3, height * 0.7));
    w = 200;//int(random(min, max));
    h = 30;//int(random(min, max));
  }
  
  // boolean contains(float x, float y) {
  //   return x >= this.x - this.w / 2 && x <= this.x + this.w / 2 && y >= this.y - this.h / 2 && y <= this.y + this.h / 2;
  // }
}