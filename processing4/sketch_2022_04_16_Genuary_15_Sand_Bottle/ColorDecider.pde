
class ColorDecider {
  PImage img;
  int generated;
  PGraphics pg;
  color[] colors = {#355590, #6ca0a7, #ffc789, #df5f50, #5a3034, #fff1dd};
  int[] xPositions;
  int xIndex = 0;
  int colorIndex = 0;
  JSONArray positions;
  ColorDecider(String imageName, JSONArray positions_) {
    if (imageName!= null && positions_ != null) {
      img = loadImage(imageName);
      pg = createGraphics(width, height);
      pg.beginDraw();
      pg.image(img, 0, 0, width, height);
      pg.endDraw();
      positions = positions_;      
    } else {
      int[] arr = {int(width * 0.25), int(width * 0.5), int(width * 0.75)};
      xPositions = arr;
    }
  }
  
  color getColor(int i) {
    if (pg != null) {
      JSONObject pos = positions.getJSONObject(i); 
      int x = pos.getInt("x");
      int y = pos.getInt("y");
      color c = pg.get(x, y);
      float r = red(c);
      float g = green(c);
      float b = blue(c);
      if (r == 0 && g == 0 && b == 0) return color(random(40));
      else return c;
    } else {
      return getColorFromPalette();
    }
  }
  
  color getColorFromPalette() {
    // spawnX = int(map(sin(frameCount / 100.0), -1, 1, 10, width - 10));
    
    generated++;
    color c = colors[colorIndex];
    if (generated >= GRAINS_PER_COLOR) {
      colorIndex = (colorIndex + 1) % colors.length;
      generated = 0;
      // xIndex = (xIndex + 1) % xPositions.length;
      // spawnX = xPositions[xIndex];
      //spawnX = int(random(10, width - 10));
    }
    return c;
  }
}
