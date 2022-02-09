
import processing.video.*;
Movie vid;
String videoFileName = "Ink - 21536.mp4";
boolean record = true;
boolean precompute = false;

int newFrame = 0;
int frames = 0;
int left;
ArrayList<Point> positions = new ArrayList<Point>();
boolean[][] visited, colorMatrixVisited;
Point[][] pixelToColorMatrix;
Point[][] pixelToPrev;
boolean[][] bfsVisited;
int w = 1280;
int h = 720;
float frameDuration;

void setup() {
  size(1280,720);
  vid = new Movie(this, videoFileName);
  
  float frameDuration = 1.0 / vid.frameRate;
  
  // Pausing the video at the first frame. 
  vid.play();
  vid.jump(0);
  vid.pause();
  // println("vid.duration(): " + vid.duration());
  // println("vid.frameRate: " + vid.frameRate);
  // println("numFrames: " + numFrames);
  // println("frameLength: " + frameLength);
  // println("test: " + (frameLength * numFrames));
  // vid.jump(frameLength / 2.0);
  left = w * h;
  // initialize matrices  
  visited = new boolean[w][h];
  colorMatrixVisited = new boolean[w][h];
  pixelToColorMatrix = new Point[w][h];
  pixelToPrev = new Point[w][h];
  bfsVisited = new boolean[w][h];
  for (int i = 0; i < w; ++i) {
    for (int j = 0; j < h; ++j) {
      visited[i][j] = false; 
      colorMatrixVisited[i][j] = false; 
    }
  }
  
  int numFocals = 12;//int(random(3,6));
  for (int i = 0; i < numFocals; ++i) {
    // Point p = new Point(w / 2,h / 2);
    Point p = new Point(int(random(w)), int(random(h)));
    //  Point p2 = new Point(int(random(w)), int(random(h)));
    firstPixel(p, p);  
  }
  
  if (precompute) {
    while(left > 0) {
      step();
    }
  }
}

void firstPixel(Point pixel, Point colorPixel) {  
  positions.add(pixel);
  visited[pixel.x][pixel.y] = true;  
  pixelToColorMatrix[pixel.x][pixel.y] = colorPixel;
  colorMatrixVisited[colorPixel.x][colorPixel.y] = true;  
  fill(vid.get(colorPixel.x,colorPixel.y));
  rect(pixel.x, pixel.y, 1, 1);
  left--;
}

void draw() {
  
  if (vid.available()) {
    vid.read();
    image(vid, 0, 0, width, height);  
    
    frames++;
    if (frames > getLength()) {
      frames = 0;
    }
    setFrame(frames);
    // println("frames: " + frames);
    
    if (!precompute) {
      for (int i = 0; i < 1000; ++i) {
        step();
      }
    }
    render();
    
    if (record) {
      saveFrame("output/frame-######.png");
    }
  }
}

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

void render() {
  PGraphics pg = createGraphics(w, h);
  pg.beginDraw();
  pg.image(vid, 0,0,w, h);
  pg.noStroke();
  int filled = 0;
  for (int x = 0; x < width; ++x) {
    for (int y = 0; y < height; ++y) {
      Point p = pixelToColorMatrix[x][y];
      if (p != null) {
        filled ++;
        pg.fill(vid.get(p.x, p.y));
        pg.rect(x,y,1,1);
      }
      
    }
  }
  pg.endDraw();
  
  image(pg, 0, 0, width, height);  
  // println("filled: " + filled);
}


ArrayList<Point> getNeighbours(Point pos, boolean desiredState, boolean[][] visitedMatrix) {
  ArrayList<Point> result = new ArrayList<Point>();
  if (pos.x > 0 && visitedMatrix[pos.x - 1][pos.y] == desiredState) {
    result.add(new Point(pos.x - 1, pos.y));
  }
  if (pos.y > 0 && visitedMatrix[pos.x][pos.y - 1] == desiredState) {
    result.add(new Point(pos.x, pos.y - 1));
  }
  if (pos.x + 1 < w && visitedMatrix[pos.x + 1][pos.y] == desiredState) {
    result.add(new Point(pos.x + 1, pos.y));
  }
  if (pos.y + 1 < h && visitedMatrix[pos.x][pos.y + 1] == desiredState) {
    result.add(new Point(pos.x, pos.y + 1));
  }
  
  return result;
}



Point findClosestUnvisitedColor(Point currentColor) {
  // println("findClosestUnvisited colorPos: " + pos);
  for (int i = 0; i < w; ++i) {
    for (int j = 0; j < h; ++j) {
      bfsVisited[i][j] = false;
    }
  }  
  ArrayList<Point> toCheck = new ArrayList<Point>();// getNeighbours(currentColor, false, bfsVisited);
  toCheck.add(currentColor);
  bfsVisited[currentColor.x][currentColor.y] = true;
  while(toCheck.size() > 0) {
    // if (toCheck.size() > w * h)
    // print(toCheck.size() + " ");
    Point p = toCheck.get(0);
    if (!colorMatrixVisited[p.x][p.y]) {
      return p;
    }
    ArrayList<Point> neighbours = getNeighbours(p, false, bfsVisited);
    for (Point n : neighbours) {
      bfsVisited[n.x][n.y] = true;
    }
    
    toCheck.addAll(neighbours);
    toCheck.remove(0);
  }
  return null;
}

void setFill(Point next, Point current) {
  // println("======================setFill");
  // println("pos: " + pos);
  Point currentColor = pixelToColorMatrix[current.x][current.y];
  Point closestColor = findClosestUnvisitedColor(currentColor);
  if (closestColor == null) {
    println("setFill found nothing!");
    return;
  }
  // color pixel
  // rect(closestColor.x, closestColor.y, 1, 1);
  
  // mark it
  colorMatrixVisited[closestColor.x][closestColor.y] = true;
  pixelToColorMatrix[next.x][next.y] = closestColor;
  // color c = vid.get(closestColor.x,closestColor.y);
  // fill(c);
}

boolean step() {
  // println("======step");
  int size = positions.size();
  if (size == 0) {
    return false;
  }
  // get random pixel
  int index = int(random(size));
  Point pixel = positions.get(index);
  ArrayList<Point> neighbours = getNeighbours(pixel, false, visited);
  Point next = new Point(0,0);
  // println("pixel - " + pixel);
  // println("neighbors - " + neighbours.size());
  if (neighbours.size() == 0) {
    positions.remove(index);
    // println("no neighours");
    return false;
  } else if (neighbours.size() == 1) { // no more unvisited neighbours, remove from positions 
    next = neighbours.get(0);
    positions.remove(index);
  } else {
    int nextIndex = int(random(neighbours.size()));
    next = neighbours.get(nextIndex);
    neighbours.remove(nextIndex);
  }
  // println("next - " + next);
  
  visited[next.x][next.y] = true;
  positions.add(next);
  setFill(next, pixel);
  // rect(next.x, next.y, 1,1);
  left--;
  if (left % 10000 == 0) 
    println("left: " + left);
  return true;
}
