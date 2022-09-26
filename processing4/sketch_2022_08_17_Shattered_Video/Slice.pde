class Slice {
  float x;
  float y;
  float a;
  PGraphics mask1, mask2;
  PVector p1,p2;
  public Slice(float x_,float y_,float a_) {
    x = x_;
    y = y_;
    a = a_;
    mask1 = createGraphics(width, height);
    mask2 = createGraphics(width, height);
    
    // compute intersect points
    if (a < PI / 2) {
      p1 = new PVector(x - (y / tan(a)), 0);
      if (p1.x < 0) {
        p1 = new PVector(0, y - tan(a) * x);
      }
      
      p2 = new PVector(width, y + tan(a) * (width - x));
      if (p2.y > height) {
        p2 = polarToCartesian((height - y) / sin(a), a);
        p2.x += x;
        p2.y += y;
      }
    } else {
      p1 = new PVector(x + tan(a - PI / 2) * y, 0);
      // println(p1);
      
      if (p1.x > width) {
        p1 = new PVector(width, y - (width - x) * tan(PI - a));
      }
      p2 = new PVector(0, y + x / tan(a - PI / 2));
      if (p2.y > height) {
        p2 = new PVector(x - (height - y) * tan(a - PI / 2), height);
      }
    }
    
    // prepare masks
    PVector tl = new PVector(0,0);
    PVector tr = new PVector(width, 0);
    PVector bl = new PVector(0, height);
    PVector br = new PVector(width, height);
    PVector[] mask1points;
    PVector[] mask2points;
    if (a > PI / 2) {
      if (p2.x == 0) {
        if (p1.y == 0) {
          mask1points = new PVector[] {p2, tl, p1};
          mask2points = new PVector[] {bl, p2, p1, tr, br};
        } else {
          mask1points = new PVector[] {p2, tl, tr, p1};
          mask2points = new PVector[] {bl, p2, p1, br};
        }
      } else {
        if (p1.y == 0) {
          mask1points = new PVector[] {p2, bl, tl, p1};
          mask2points = new PVector[] {p2, p1, tr, br};
        } else {
          mask1points = new PVector[] {p2, bl, tl, tr, p1};
          mask2points = new PVector[] {p2, p1, br};
        }
      }
    } else {
      if (p1.x == 0) {
        if (p2.x == width) {
          mask1points = new PVector[] {p1, tl, tr, p2};
          mask2points = new PVector[] {bl, p1, p2, br};
        } else {
          mask1points = new PVector[] {p1, tl, tr, br, p2};
          mask2points = new PVector[] {bl, p1, p2};
        }
      } else {
        if (p2.x == width) {
          mask1points = new PVector[] {p1, tr, p2};
          mask2points = new PVector[] {bl, tl, p1, p2, br};
        } else {
          mask1points = new PVector[] {p1, tr, br, p2};
          mask2points = new PVector[] {bl, tl, p1, p2};
        }
      }
    }
    
    mask1.beginDraw();
    mask2.beginDraw();
    mask1.fill(255);
    mask2.fill(255);
    mask1.background(0);
    mask2.background(0);
    mask1.beginShape();
    mask2.beginShape();        
    for (PVector p : mask1points) {
      mask1.vertex(p.x, p.y);
    }
    for (PVector p : mask2points) {
      mask2.vertex(p.x, p.y);
    }
    mask1.endShape();
    mask2.endShape(CLOSE);
    mask1.endDraw();
    mask2.endDraw();
  }
  
  
  
  public void print() {
    println(x + "," + y + " | " + a);
  }
}