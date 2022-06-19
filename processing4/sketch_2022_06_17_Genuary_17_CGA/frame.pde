

int brickWidth = 10;
int brickHeight = 10;

color[] palette = {#ff55ff, #55ffff, #ffffff, #000000};

float distance(color a, color b) {
  return sqrt(sq(red(a) - red(b)) + sq(green(a) - green(b)) + sq(blue(a) - blue(b)));
}

color findClosestColor(color p) {
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


// void sampleRect(int x,int y,int w, int h, PGraphics pg) { //X Y correspond to the upper left corner, W and H are sizes
//   color c = pg.get(x,y);//pg.get(max(min(x + w / 2,width),0) , max(min(y + h / 2,height),0)); //Get color from the middle pixel of our future block
//   c = findClosestColor(c);
//   //The max(min( functions are to limit the center coordinate so that it stays in the picture so that it doesn't try to grab a pixel from outside the screen. 
//   fill(c); //Use that color for drawing
//   rect(x,y,w,h); //Draw it with that color
//   // set(x,y,c);

// }

void drawFrame(PGraphics pg) {
  // pixelate
  PGraphics frameBuffer = createGraphics(width, height);
  frameBuffer.beginDraw();
  frameBuffer.noStroke();
  for (int y = 0;y < height;y += brickHeight) {
    for (int x = 0;x < width;x += brickWidth) {
      color c = pg.get(max(min(x + brickWidth / 2,width),0) , max(min(y + brickHeight / 2,height),0)); 
      frameBuffer.fill(c); 
      frameBuffer.rect(x,y,brickWidth,brickHeight); 
    }
  }
  // frameBuffer.endDraw();
  // image(frameBuffer, 0, 0);
  
  // colorize
  // color[] error = new color[frameBuffer.width];
  // color nextPixelError = color(0);
  // float quant_error;
  for (int y = 0;y < frameBuffer.height;y++) {    
    for (int x = 0;x < frameBuffer.width;x++) {
      color c = frameBuffer.get(x,y);
      float oldR = red(c);
      float oldG = green(c);
      float oldB = blue(c);
      int factor = 1;
      color closest = findClosestColor(c);
      float newR = red(closest);
      float newG = green(closest);
      float newB = blue(closest);
      frameBuffer.set(x,y, closest);
      
      float errR = oldR - newR;
      float errG = oldG - newG;
      float errB = oldB - newB;
      
      // pixels[x + 1][y    ] := pixels[x + 1][y    ] + quant_error × 7 / 16
      if (x < frameBuffer.width - 1) 
        passError(x + 1, y, errR, errG, errB, 7.0, frameBuffer);
      // pixels[x - 1][y + 1] := pixels[x - 1][y + 1] + quant_error × 3 / 16
      if (x > 0 && y < frameBuffer.height - 1)
        passError(x - 1, y + 1, errR, errG, errB, 3.0, frameBuffer);
      //   pixels[x    ][y + 1] := pixels[x    ][y + 1] + quant_error × 5 / 16
      if (y < frameBuffer.height - 1)
        passError(x , y + 1, errR, errG, errB, 5.0, frameBuffer);
      //   pixels[x + 1][y + 1] := pixels[x + 1][y + 1] + quant_error × 1 / 16
      if (x < frameBuffer.width - 1 && y < frameBuffer.height - 1)
        passError(x + 1, y + 1, errR, errG, errB, 1.0, frameBuffer);
      
      // c = frameBuffer.get(x + 1,y);
      // newR = red(c) + errR * 7 / 16.0;
      // newG = green(center) + errG * 7 / 16.0;
      // newB = blue(c) + errB * 7 / 16.0;
      // frameBuffer.set(x + 1, y, color(newR, newG, newB);
      
      // color c = frameBuffer.get(x,y); 
      // c = findClosestColor(c);
      // frameBuffer.set(x, y, c);
      // frameBuffer.rect(x,y,1,1); 
    }
  }
  frameBuffer.endDraw();
  image(frameBuffer, 0,0, width,height);
}

void passError(int x, int y, float errR, float errG, float errB, float factor, PGraphics frameBuffer) {
  color c = frameBuffer.get(x,y);
  float newR = red(c) + errR * factor / 16.0;
  float newG = green(c) + errG * factor / 16.0;
  float newB = blue(c) + errB * factor / 16.0;
  frameBuffer.set(x, y, color(newR, newG, newB));
}