class Square{
  color f;
  float s;
  float a;
  float rotation;
  Square(float s, color f, float rotation) {
    this.s = s;
    this.f = f;
    this.rotation = rotation;
    this.a = this.rotation;
  }
  
  void step() {
  }
  
  void draw() {
    stroke(0);
    strokeWeight(2);
    fill(this.f);
    pushMatrix();
    rotate(this.a);
    square(0,0,this.s);
    popMatrix();
  }
}