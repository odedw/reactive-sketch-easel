class Rect{
  color f;
  int x,y,s, speed;
  float angle, rotation;
  Rect(color f, int x, int y) {
    this.f = f;
    this.x = x;
    this.y = y;
    this.s = 0;
    this.speed = 6;
  }
  
  void draw() {
    pushMatrix();
    noStroke();
    translate(this.x, this.y);
    fill(this.f);
    square(0,0,s);
    popMatrix();
  }
  void step() {
    this.s += this.speed;
  }
}