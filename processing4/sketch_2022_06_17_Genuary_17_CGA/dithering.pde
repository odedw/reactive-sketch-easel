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

void dither(color[] pixels, int w, int h, DitherAlgorithm alg, color[] palette) {
  color[] error = new color[w];
  for (int y = 0;y < h;y++) {    
    for (int x = 0;x < w;x++) {
      color c = pixels[y * w + x];//pg.get(x,y);
      float oldR = red(c);
      float oldG = green(c);
      float oldB = blue(c);
      int factor = 1;
      color closest = findClosestColor(c, palette);
      float newR = red(closest);
      float newG = green(closest);
      float newB = blue(closest);
      // pg.set(x,y, closest);
      pixels[y * w + x] = closest;
      
      float errR = oldR - newR;
      float errG = oldG - newG;
      float errB = oldB - newB;
      
      // don't pass the error if the closest color is black
      if (closest == #000000) continue;
      
      
      
      if (alg == DitherAlgorithm.FLOYD_STEINBERG) {
        passError(x + 1, y, errR, errG, errB, 7.0 / 16.0, pixels, w, h);
        passError(x - 1, y + 1, errR, errG, errB, 3.0 / 16.0, pixels, w, h);
        passError(x , y + 1, errR, errG, errB, 5.0 / 16.0, pixels, w, h);
        passError(x + 1, y + 1, errR, errG, errB, 1.0 / 16.0, pixels, w, h);
      } else if (alg == DitherAlgorithm.STUCKI) {
        //         X   8   4 
        // 2   4   8   4   2
        // 1   2   4   2   1
        //   (1/42)
        passError(x + 1, y, errR, errG, errB, 8.0 / 42.0, pixels, w, h);
        passError(x + 2, y, errR, errG, errB, 4.0 / 42.0, pixels, w, h);
        passError(x - 2, y + 1, errR, errG, errB, 2.0 / 42.0, pixels, w, h);
        passError(x - 1, y + 1, errR, errG, errB, 4.0 / 42.0, pixels, w, h);
        passError(x, y + 1, errR, errG, errB, 8.0 / 42.0, pixels, w, h);
        passError(x + 1, y + 1, errR, errG, errB, 4.0 / 42.0, pixels, w, h);
        passError(x + 2, y + 1, errR, errG, errB, 2.0 / 42.0, pixels, w, h);
        passError(x - 2, y + 2, errR, errG, errB, 1.0 / 42.0, pixels, w, h);
        passError(x - 1, y + 2, errR, errG, errB, 2.0 / 42.0, pixels, w, h);
        passError(x, y + 2, errR, errG, errB, 4.0 / 42.0, pixels, w, h);
        passError(x + 1, y + 2, errR, errG, errB, 2.0 / 42.0, pixels, w, h);
        passError(x + 2, y + 2, errR, errG, errB, 1.0 / 42.0, pixels, w, h);
      }
    }
  }
}


void passError(int x, int y, float errR, float errG, float errB, float ratio, color[] pixels, int w, int h) {
  if (x >=  w || y >= h) return;
  
  color c = pixels[y * w + x];// pg.get(x,y);
  float newR = red(c) + errR * ratio;
  float newG = green(c) + errG * ratio;
  float newB = blue(c) + errB * ratio;
  // pg.set(x, y, color(newR, newG, newB));
  pixels[y * w + x] = color(newR, newG, newB);
}