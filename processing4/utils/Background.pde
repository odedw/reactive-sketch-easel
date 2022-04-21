class Background{
  PGraphics pg;
  OpenSimplexNoise noise = new OpenSimplexNoise();
  Background() {
    float zOffset = random(1000);
    float noiseScale = 0.2; 
    
    pg = createGraphics(width, height);  
    pg.beginDraw();
    pg.background(255);
    pg.loadPixels();
    for (int y = 0; y < height; y++) {
      for (int x = 0; x < width; x++) {
        float v = (float) noise.eval(x * noiseScale, y * noiseScale * 5, zOffset);      
        float c = map(v, -1, 1, 210, 255);
        int index = (x + y * width);
        pg.pixels[index] = color(c);
        
      }
    }
    pg.updatePixels();
    pg.endDraw();
  }
  
  void draw() {
    image(pg, 0,0,width,height);
  }
}