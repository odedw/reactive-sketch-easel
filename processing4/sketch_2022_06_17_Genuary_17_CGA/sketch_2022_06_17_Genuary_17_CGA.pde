
import processing.video.*;

boolean shouldSaveFrame = false;
PImage img;
PGraphics pg;
Movie vid;
color[] palette = {#ff55ff, #55ffff, #ffffff, #000000};
int pixelSize = 5;

// String videoFileName = "20220531_192145.mp4";
// String videoFileName = "man-running.mp4";
String videoFileName = "hand-in-the-sand.mp4";
int frames = 0;

int getLength() {
  return int(vid.duration() * vid.frameRate);
}

void setFrame(int n) {
  vid.play();
  
  // The duration of a single frame:
  float frameDuration = 1.0 / vid.frameRate;
  
  // We move to the middle of the frame by adding 0.5:
  float where = (n + 0.5) * frameDuration; 
  
  // Taking into account border effects:
  float diff = vid.duration() - where;
  if (diff < 0) {
    where += diff - 0.25 * frameDuration;
  }
  
  vid.jump(where);
  vid.pause();  
} 

void setup() {
  size(1280,720);
  // img = loadImage("elizeu-dias-RN6ts8IZ4_0-unsplash.jpg");
  pg = createGraphics(width, height);
  // pg.beginDraw();
  // pg.image(img, 0,0,width,height);
  // pg.endDraw();
  noStroke(); 
  
  vid = new Movie(this, videoFileName);
  
  float frameDuration = 1.0 / vid.frameRate;
  
  // Pausing the video at the first frame. 
  vid.play();
  vid.jump(0);
  vid.pause();
  
}

void draw() {
  if (vid.available()) {
    vid.read();
    pg.beginDraw();
    pg.image(vid, 0,0,width,height);
    pg.endDraw();
    
    // image(pg, 0, 0, width, height);  
    drawFrame(pg);
    frames++;
    if (frames > getLength()) {
      // frames = 0;
      println("done");
      noLoop();
    }
    setFrame(frames);
    // drawFrame(pg);
    if (shouldSaveFrame) {
      saveFrame("output/frame-######.png");
    }
  }
}

boolean running = true;
void mousePressed() {
  if (running) {
    noLoop();
  } else {
    loop();
  }
  running = !running;
  println("frameCount: " + frameCount);
}



void drawFrame(PGraphics pg) {
  // pixelate
  PGraphics frameBuffer = createGraphics(pg.width / pixelSize, pg.height / pixelSize);
  frameBuffer.beginDraw();
  // frameBuffer.image(pg, 0,0, frameBuffer.width, frameBuffer.height);
  pixelate(pg, frameBuffer, pixelSize);
  dither(frameBuffer, DitherAlgorithm.FLOYD_STEINBERG, palette);
  
  frameBuffer.endDraw();
  // image(frameBuffer, 0,0, width, height);
  for (int y = 0;y < frameBuffer.height;y ++) {
    for (int x = 0;x < frameBuffer.width;x ++) {
      fill(frameBuffer.get(x,y));
      rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}

