class Fragment {
  Rect r;
  PVector[] positions;
  Fragment(Rect r_, int amount) {
    r = r_;
    positions = new PVector[amount];
    for (int i = 0; i < positions.length; ++i) {
      positions[i] = new PVector(random( -r.w,width), random( -r.h,height));
    }
  }
  
  void draw(Movie frame) {
    for (PVector p : positions) {
      if (random(1) > 0.995) continue;
      copy(frame, r.x, r.y, r.w, r.h, int(p.x), int(p.y), r.w, r.h);
    }    
  }
} 