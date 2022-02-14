class Line{
  int y = 0;
  color c;
  Line prev;
  ArrayList<PVector> points = new ArrayList<PVector>();
  Line(int y, color c, Line prev) {
    this.y = y;
    this.c = c;
    points.add(new PVector(0,y));
    this.prev = prev;
  }
  
  boolean update() {
    PVector lastPoint = points.get(this.points.size() - 1);
    PVector lastPrevPoint = this.prev != null ? prev.points.get(this.points.size() - 1) : null;
    
    if (lastPoint.x >= width) {
      return false;
    } 
    PVector newPoint = null;
    while(newPoint == null) {
      newPoint = new PVector(lastPoint.x + GAP,(lastPrevPoint != null ? VERTICAL_GAP + lastPrevPoint.y : lastPoint.y) + int(randomGaussian()*3/4));
      // if (lastPrevPoint != null && newPoint.y < lastPrevPoint.y - 2 || newPoint.y < 0) {
      if (newPoint.y < 0) {
        newPoint = null;
      } else if (this.prev != null) {
        for (PVector p : prev.points) {
          if (dist(p.x, p.y, newPoint.x, newPoint.y) < MIN_DISTANCE) {
            newPoint = null;
            break;
          }
        }
      }
    }
    
    points.add(newPoint);
    
    return true;
  }
  
  void draw() {
    noFill();
    stroke(this.c);
    beginShape();
    for (PVector p : this.points) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}
