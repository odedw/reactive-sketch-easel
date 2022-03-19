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
    this.rotation = random(0.02, 0.03);
    this.angle = 0;
  }
  
  void draw() {
    pushMatrix();
    noStroke();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.f);
    square(0,0,s);
    popMatrix();
  }
  void step() {
    this.s += this.speed;
    this.angle += this.rotation;
  }
}