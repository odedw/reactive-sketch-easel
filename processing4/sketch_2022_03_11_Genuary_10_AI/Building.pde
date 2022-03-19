class Building{
  int x,h, w, speed, hSpeed;
  
  color f;
  Building(color f, int x, int w) {
    this.f = f;
    this.x = x;
    this.h = 0;
    this.w = w;
    this.speed = 6;
    this.hSpeed = 4;
  }
  
  void step() {
    this.h += this.speed;
    if (this.h >= height / 3)
      this.x += this.x < width / 2 ? - this.hSpeed : this.hSpeed;
  }
  
  void draw() {
    pushMatrix();
    noStroke();
    fill(this.f);
    translate(this.x + this.w / 2, height - this.h / 2);
    rect(0,0,this.w,this.h);
    popMatrix();
  }
}