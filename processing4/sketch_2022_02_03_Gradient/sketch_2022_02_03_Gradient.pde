void setup() {
  size(600,600);
  noStroke();
  
}

void draw() {
  float range = width * height / 3.0;
  float segment = 256.0 / range;
  for (int y = 0;y < height;y++) {
    for (int x = 0;x < width;x++) {
      
      int i = y * x + x; 
      if (i < range) {
        fill(segment * i, 0 ,0);
        println(segment * i + ",0,0");
      } else if (i < range * 2) {
        fill(255, segment * (i % range), 0);
        println("255," + segment * (i % range) + ",0");
        
      } else {
        fill(255, 255, segment * (i % range));
        println("255,255," + segment * (i % range));
        
      }
      rect(x, y, 1, 1);
    }
  }
  noLoop();
}
