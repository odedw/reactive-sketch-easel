class Element{
  color strokeColor;
  int x,y,s,strokeWeight, dir, speed;
  float  angle, rotation;
  Element(color strokeColor, int x, int y, int s, int strokeWeight) {
    this.strokeColor = strokeColor;
    this.x = x;
    this.y = y;
    this.s = s;
    this.strokeWeight = strokeWeight;
    this.dir = random(1) < 0.5 ? 1 : - 1;
    this.speed = 2;
    this.rotation = random(0.05);
    this.angle = 0;
  }
  
  void draw() {
    pushMatrix();
    translate(x, y);
    rotate(this.angle);
    stroke(this.strokeColor);
    noFill();
    strokeWeight(this.strokeWeight);
    square(0,0,s);
    popMatrix();
  }
  void step() {
    this.s += this.dir * this.speed;
    if (this.s >= width) {
      this.dir = -1;
    } else if (this.s < this.strokeWeight * 2) {
      this.dir = 1;
    }
    this.angle += this.rotation;
  }
}