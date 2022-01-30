class Pixel {
  PVector pos;
  color c;
  float brightness;
  Pixel(PVector p, color c) {
    this.pos = p;
    this.c = c;
    this.brightness = (red(c) + green(c) + blue(c)) / 3.0;
  }
}

ArrayList<Pixel> getPixels(PImage img) {
  PGraphics pg = createGraphics(width, height);
  pg.beginDraw();
  pg.image(img, 0,0,width, height);
  pg.endDraw();
  ArrayList<Pixel> pixels = new ArrayList<Pixel>();
  for (int x = 0; x < width; ++x) {
    for (int y = 0; y < height; ++y) {
      color c = pg.get(x, y);
      pixels.add(new Pixel(new PVector(x,y), c));
    }
  }
  return pixels;
}