class River{
  ArrayList<PVector> points = new ArrayList<PVector>();
  color c;
  int y,h,x,d, speed;
  River(color c, int y, int h, int d) {
    this.c = c;
    this.y = y;
    this.h = h;
    this.d = d;
    this.x = d < 0 ? width : 0;
    this.speed = 6;
    this.points.add(new PVector(this.x, this.y));
  }
  
  void step() {
    this.x += this.d * this.speed;
    if (this.x < width && this.x > 0) {
      
      this.points.add(new PVector(this.x, this.y + random( -5,5)));
    } else if (this.points.size() > 0) {
      this.points.remove(0);
    }
    
  }
  
  void draw() {
    strokeWeight(this.h);
    strokeCap(PROJECT);
    stroke(this.c);
    for (int i = 1; i < this.points.size(); ++i) {
      line(this.points.get(i - 1).x, this.points.get(i - 1).y, this.points.get(i).x, this.points.get(i).y);
    }
    endShape();
  }
}