class Cloud{
  int y,x,speed, w, h;
  color c;
  Cloud(int y, int x, int speed, color c) {
    this.y = y;
    this.x = x;
    this.speed = speed;
    this.c = c; 
    this.w = int(random(width * 0.2, width * 0.3));
    this.h = int(random(width * 0.1, width * 0.15));
  }
  
  void step() {
    this.x += this.speed;
  }
  
  void draw() {
    pushMatrix();
    fill(c);
    translate(this.x, this.y);
    ellipse(0, 0, this.w, this.h);
    popMatrix();
  }
}