class Dune{
  float h,w;
  PVector p1, c1, c2, p2;
  float angle = radians(15);
  float slopeH;
  PVector[] bezierPoints = new PVector[10000];
  
  Dune() {
    w = width;
    h = height / 3;
    
    p1 = new PVector(w / 2, 0);
    c1 = new PVector(0, h * 0.5);
    c2 = new PVector(w, h * 0.5);
    p2 = new PVector(p1.x, h);
    
    slopeH =  tan(angle) * p1.x;
    
    for (int i = 0; i < bezierPoints.length; i++) {
      float t = i / float(bezierPoints.length);
      float x = bezierPoint(p1.x, c1.x, c2.x, p2.x, t);
      float y = bezierPoint(p1.y, c1.y, c2.y, p2.y, t);
      bezierPoints[i] = new PVector(x,y);
    }
    
  }
  
  
  PVector findClosestPointOnBezierByY(float y) {
    PVector closest = bezierPoints[0];
    for (int i = 1; i < bezierPoints.length; ++i) {
      if (abs(y - bezierPoints[i].y) < abs(y - closest.y)) {
        closest = bezierPoints[i];
      }
    }
    return closest;
  }
  
  PVector findClosestPointOnLineByX(float x) {
    float y = tan(angle) * (x > w / 2 ? w - x : x);
    // println("y: " + y);
    // println("p1: " + p1);
    // println("x: " + x);
    return new PVector(x, p1.y + slopeH - y);
  }
  
  
  PGraphics create() {
    PGraphics pg;
    pg = createGraphics(int(w), int(h));
    pg.beginDraw();
    pg.noStroke();
    pg.background(255);
    // debug {
    // pg.fill(0);
    // pg.beginShape();
    // pg.vertex(p1.x, p1.y);
    // pg.vertex( -1, p1.y + slopeH);
    // pg.vertex( -1, h + 1);
    // pg.vertex(w + 1, h + 1);
    // pg.vertex(w + 1, p1.y + slopeH);
    // pg.endShape(CLOSE);
    
    // pg.noFill();
    // pg.stroke(0);
    // pg.strokeWeight(1);
    // pg.bezier(p1.x, p1.y,c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
    // println("slopeH: " + slopeH);
    // pg.line(p1.x, p1.y, p1.x, p1.y + slopeH);
    //}
    
    
    
    
    for (int i = 0; i < w * h; ++i) {
      if (i % 1000 == 0) {
        println(i + "/" + (w * h));
      }
      // PVector p = new PVector(random(width), random(height));
      PVector p = new PVector(i % w, i / h);
      PVector closest = findClosestPointOnLineByX(p.x);
      if (p.y < closest.y) {
        continue;
      } else{
        closest = findClosestPointOnBezierByY(p.y);
        if (p.x < closest.x) {
          pg.fill(randomColor(sunny), 255);
        } else{
          pg.fill(randomColor(shaded), 255);
        }
      }
      pg.circle(p.x, p.y, 2);
    }
    pg.endDraw();
    
    return pg;
  }
}