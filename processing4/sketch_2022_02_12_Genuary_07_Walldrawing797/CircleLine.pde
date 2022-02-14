class Point{
  int r;
  float angle;
  PVector coord;
  Point(int r, float angle, PVector coord) {
    this.r = r;
    this.angle = angle;
    this.coord = coord;
  }
}
class CircleLine{
  int r;
  color c;
  CircleLine prev;
  float angle;
  int lastRadius;
  ArrayList<Point> points = new ArrayList<Point>();
  
  CircleLine(int r, color c, CircleLine prev) {
    this.r = r;
    this.c = c;
    this.prev = prev;
    points.add(new Point(r, angle, new PVector(width / 2 + r, height / 2)));
    this.lastRadius = r;
  }
  
  boolean update() {
    if (angle > TWO_PI) {
      return false;
    }
    Point lastPrevPoint = this.prev != null ? prev.points.get(this.points.size() - 1) : null;
    int prevRadius = lastPrevPoint == null ? lastRadius : lastPrevPoint.r + VERTICAL_GAP;
    angle += ANGLE_DELTA;
    int newRadius = prevRadius + (random(0, 1) > 0.9 ? int(random( -2,2)) : 0);
    PVector coord = new PVector(width / 2 +  newRadius * cos(angle), height / 2 +  newRadius * sin(angle));
    points.add(new Point(newRadius, angle, coord));
    lastRadius = newRadius;
    return true;
  }
  
  void draw() {
    stroke(this.c);
    beginShape();
    for (Point p : this.points) {
      vertex(p.coord.x, p.coord.y);
      // ellipse(p.x, p.y, 5, 5);
    }
    if (angle > TWO_PI) {
      endShape(CLOSE);
    } else {
      endShape();
    }
  }
}
