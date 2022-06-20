void pixelate(PGraphics source, PGraphics destination, int pixelSize) {
  destination.noStroke();
  for (int y = 0; y < destination.height; y++) {
    for (int x = 0; x < destination.width; x++) {
      color c = source.get(max(min(x * pixelSize + pixelSize / 2,source.width),0) , max(min(y * pixelSize + pixelSize / 2,source.height),0)); 
      destination.set(x,y,c);
    }
  }
}