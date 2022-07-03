
import processing.video.*;
int PIXEL_SIZE = 4;
color[] palette = {#ff55ff, #55ffff, #000000, #ffffff };
boolean SHOULD_SAVE_FRAME = false;

PImage img;
PGraphics pg;
Movie mov;
// color[] palette = {#880E1E, #B51459, #C34124, #E7AE1C, #DFB09F, #6D6B40, #47792D, #0A3E34, #072675, #6D729C};

// String videoFileName = "20220531_192145.mp4";
// String videoFileName = "man-running.mp4";
String videoFileName = "hand-in-the-sand.mp4";
// String videoFileName = "highway-with-cars-static.mp4";
// String videoFileName = "highway-with-cars-static-square.mp4";
// String videoFileName = "pov-bike.mp4";
// String videoFileName = "20220624_141524.mp4";
// String videoFileName = "train.mp4";
// String videoFileName = "A Group Of Ballerina Wearing A Phantom Mask Staging A Live Performance.mp4";
int frames = 0;
color pixels[];
int numPixelsWide,numPixelsHigh;
int blockSize = PIXEL_SIZE;

void setup() {
  size(1920,1080);
  noStroke(); 
  
  mov = new Movie(this, videoFileName);
  numPixelsWide = width / blockSize;
  numPixelsHigh = height / blockSize;
  pixels = new color[numPixelsWide * numPixelsHigh];
  // Pausing the video at the first frame. 
  mov.play();
  mov.jump(0);
  mov.pause();
}

int getLength() {
  return int(mov.duration() * mov.frameRate);
}

void setFrame(int n) {
  mov.play();
  
  // The duration of a single frame:
  float frameDuration = 1.0 / mov.frameRate;
  
  // We move to the middle of the frame by adding 0.5:
  float where = (n + 0.5) * frameDuration; 
  
  // Taking into account border effects:
  float diff = mov.duration() - where;
  if (diff < 0) {
    where += diff - 0.25 * frameDuration;
  }
  
  mov.jump(where);
  mov.pause();  
} 

void draw() {
  if (mov.available()) {
    drawFrame(mov);
    
    frames++;
    
    if (frames > getLength()) {
      // frames = 0;
      println("done");
      noLoop();
    }
    setFrame(frames);
    
    if (SHOULD_SAVE_FRAME) {
      saveFrame("output/frame-######.png");
    }
  } else {
    //println("not available");
  }
}

void drawFrame(Movie mov) {
  mov.read();
  mov.loadPixels();
  int count = 0;
  for (int j = 0; j < numPixelsHigh; j++) {
    for (int i = 0; i < numPixelsWide; i++) {
      pixels[count] = mov.get(i * blockSize, j * blockSize);
      count++;
    }
  }
  
  dither(pixels, numPixelsWide, numPixelsHigh, DitherAlgorithm.STUCKI, palette);
  for (int j = 0; j < numPixelsHigh; j++) {
    for (int i = 0; i < numPixelsWide; i++) {
      fill(pixels[j * numPixelsWide + i]);
      rect(i * blockSize, j * blockSize, blockSize, blockSize);
    }
  }
}
