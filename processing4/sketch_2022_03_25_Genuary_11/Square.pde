class Square{
  color f;
  float s;
  float targetS;
  float a;
  float targetA;
  float rotation;
  Square(float s, color f, float rotation) {
    this.s = 0;
    this.targetS = s;
    this.f = f;
    this.rotation = rotation;
    this.a = 0;
    this.targetA = rotation;
    
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