public enum DitherAlgorithm {
  NONE,
  FLOYD_STEINBERG,
  STUCKI 
};


float distance(color a, color b) {
  return sqrt(sq(red(a) - red(b)) + sq(green(a) - green(b)) + sq(blue(a) - blue(b)));
}

color findClosestColor(color p, color[] palette) {
  color closest = palette[0];
  float closestDistance = -1;
  for (color c : palette) {
    float dist = distance(p,c);
    // println(dist);
    if (closestDistance == -1 || dist < closestDistance) {
      closestDistance = dist;
      closest = c;
    }    
  }
  return closest;
}

void dither(PGraphics pg, DitherAlgorithm alg, color[] palette) {
  color[] error = new color[pg.width];
  for (int y = 0;y < pg.height;y++) {    
    for (int x = 0;x < pg.width;x++) {
      color c = pg.get(x,y);
      float oldR = red(c);
      float oldG = green(c);
      float oldB = blue(c);
      int factor = 1;
      color closest = findClosestColor(c, palette);
      float newR = red(closest);
      float newG = green(closest);
      float newB = blue(closest);
      pg.set(x,y, closest);
      
      float errR = oldR - newR;
      float errG = oldG - newG;
      float errB = oldB - newB;
      
      if (alg == DitherAlgorithm.FLOYD_STEINBERG) {
        passError(x + 1, y, errR, errG, errB, 7.0, pg);
        passError(x - 1, y + 1, errR, errG, errB, 3.0, pg);
        passError(x , y + 1, errR, errG, errB, 5.0, pg);
        passError(x + 1, y + 1, errR, errG, errB, 1.0, pg);
      } else if (alg == DitherAlgorithm.STUCKI) {
        //         X   8   4 
        // 2   4   8   4   2
        // 1   2   4   2   1
        //   (1/42)
      }
    }
  }
}


void passError(int x, int y, float errR, float errG, float errB, float factor, PGraphics pg) {
  if (x >= pg.width || y >= pg.height) return;
  
  color c = pg.get(x,y);
  float newR = red(c) + errR * factor / 16.0;
  float newG = green(c) + errG * factor / 16.0;
  float newB = blue(c) + errB * factor / 16.0;
  pg.set(x, y, color(newR, newG, newB));
}