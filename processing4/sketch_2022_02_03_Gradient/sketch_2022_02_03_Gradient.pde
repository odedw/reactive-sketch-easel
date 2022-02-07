void setup() {
  size(320, 240);  
  pixelDensity(1);
}

void draw() {
  
  loadPixels();
  for (int y = 0; y < height;y++) {
    for (int x = 0; x < width; x++){
     int index = (x + y * width) * 4;
     pixels[index + 0] = x;
     pixels[index + 1] = 0;
     pixels[index + 2] = y;
     pixels[index + 3] = 255;
     
    }
  }
  //save("gradient.png");
  
  updatePixels();
  noLoop();
}
