int GRAINS_PER_COLOR = 1000;

class ColorDecider {
  PImage img;
  int generated;
  PGraphics pg;
  color[] colors = {#355590, #6ca0a7, #ffc789, #df5f50, #5a3034, #fff1dd};
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
      if (generated >= GRAINS_PER_COLOR) {
        colorIndex = (colorIndex + 1) % colors.length;
        generated = 0;
      }
      generated++;
      return colors[colorIndex];
    }
  }
}