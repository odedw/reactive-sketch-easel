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
    PVector lastPrevPoint = this.prev != null && this.prev.points.size() > this.points.size() - 1 ? prev.points.get(this.points.size() - 1) : null;
    
    if (lastPoint.x >= width) {
      return false;
    } 
    PVector newPoint = null;
    int tries = 0;
    while(newPoint == null && tries < 10) {
      newPoint = new PVector(lastPoint.x + GAP,(lastPrevPoint != null ? VERTICAL_GAP + lastPrevPoint.y : lastPoint.y) + int(randomGaussian() * 3 / 4));
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
        
        // for (CircleLine l : circleLines) {
        //   if (newPoint == null) break;
        
        //   for (Point p : l.points) {
        //     if (dist(p.coord.x, p.coord.y, newPoint.x, newPoint.y) < MIN_DISTANCE) {
        //       newPoint = null;
        //       break;
        //     }
        //   } 
        // }
      }
      tries++;
    }
    if (tries >= 10) {
      return false;
    }
    points.add(newPoint);
    return true;
  }
  
  void draw() {
    stroke(this.c);
    beginShape();
    for (PVector p : this.points) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}
