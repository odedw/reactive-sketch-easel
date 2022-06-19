

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
  
  for (int y = 0;y < frameBuffer.height;y++) {    
    for (int x = 0;x < frameBuffer.width;x++) {
      // color oldpixel = frameBuffer.get()
      // oldpixel := pixels[x][y]
      // newpixel := find_closest_palette_color(oldpixel)
      //   pixels[x][y] := newpixel
      //   quant_error := oldpixel - newpixel
      //   pixels[x + 1][y   ] := pixels[x + 1][y   ] + quant_error × 7 / 16
      //   pixels[x - 1][y + 1] := pixels[x - 1][y + 1] + quant_error × 3 / 16
      //   pixels[x   ][y + 1] := pixels[x   ][y + 1] + quant_error × 5 / 16
      //   pixels[x + 1][y + 1] := pixels[x + 1][y + 1] + quant_error × 1 / 16
      
      
      
      
      
      
      color c = frameBuffer.get(x,y); 
      c = findClosestColor(c);
      frameBuffer.set(x, y, c);
      // frameBuffer.rect(x,y,1,1); 
    }
  }
  frameBuffer.endDraw();
  image(frameBuffer, 0,0, width,height);
}