class Track {
  int  x, w, speed, GAP;
  ArrayList<Segment> segments = new ArrayList<Segment>();
  int upperIndex = 0;
  Track(int x_, int w_, int speed_) {
    x = x_;
    w = w_;
    speed = speed_;
    GAP = w / 2;
    
    int y = -100;
    while(y < height + 100) {
      int h = int(random(w, height / 10));
      segments.add(new Segment(x, y, w, h));
      y += h + GAP;
    }
  }
  
  void update() {
    for (int i = 0; i < segments.size(); ++i) {
      Segment s = segments.get(i);
      if (s.y > height) {
        s.y = segments.get(upperIndex).y - GAP - s.h;
        upperIndex--;
        if (upperIndex == -1) upperIndex = segments.size() - 1;
        
      }
      s.y += speed;
      
    }
  }
  
  void draw() {
    for (Segment s : segments) {
      s.draw();
    }
  }
  
  class Segment{
    int x,y,w,h,r;
    
    Segment(int x_, int y_, int w_, int h_) {
      x = x_;
      y = y_;
      w = w_;
      h = h_;
      r = w_ / 2;
    }
    
    void draw() {
      fill(0);
      noStroke();
      circle(x + r, y + r, 2 * r);
      rect(x, y + r, w,h - 2 * r);
      circle(x + r, y + h - r, 2 * r);
    }
  }
}