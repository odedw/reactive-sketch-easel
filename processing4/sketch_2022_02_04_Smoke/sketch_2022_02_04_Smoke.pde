PImage img;
ArrayList<Point> positions = new ArrayList<Point>();
boolean[][] visited, colorMatrixVisited;
color[][] colorMatrix;
Point[][] pixelToColorMatrix;
Point[][] pixelToPrev;
boolean[][] bfsVisited;
int w = 800;
int h = 800;
String frameName = "output3/genuary-06-######.png";
String imageName = "result.png";
boolean shouldSaveFrame = false;

void setup() {
  size(800 ,800);
  left = w * h;
  // img = loadImage("myCanvas.jpg");
  noStroke();
  background(0); 
  // image(img, 0,0,w,h);
  
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
  
  
  img = loadImage(imageName);
  // get image colors
  colorMatrix = new color[w][h];
  PGraphics pg = createGraphics(w, h);
  pg.beginDraw();
  
  pg.image(img, 0,0,w, h);
  pg.endDraw();
  for (int x = 0; x < w; ++x) {
    for (int y = 0; y < h; ++y) {
      colorMatrix[x][y] = pg.get(x, y);
    }
  }
  
  image(img, 0,0,w,h);
  
  
  int numFocals = 20;//int(random(3,6));
  for (int i = 0; i < numFocals; ++i) {
    Point p = new Point(int(random(w)), int(random(h)));
    Point p2 = new Point(int(random(w)), int(random(h)));
    firstPixel(p, p2);  
  }
  run = true;
  
  // selectInput("Select a file to process:", "fileSelected");
  // firstPixel(new Point(int(random(w)), int(random(h))), new Point(int(random(w)), int(random(h))));  
}

void fileSelected(File selection) {
  if (selection == null) {
    println("Window was closed or the user hit cancel.");
  } else {
    println("User selected " + selection.getAbsolutePath());
    img = loadImage(selection.getAbsolutePath());
    // get image colors
    colorMatrix = new color[w][h];
    PGraphics pg = createGraphics(w, h);
    pg.beginDraw();
    
    pg.image(img, 0,0,w, h);
    pg.endDraw();
    for (int x = 0; x < w; ++x) {
      for (int y = 0; y < h; ++y) {
        colorMatrix[x][y] = pg.get(x, y);
      }
    }
    int numFocals = 20;//int(random(3,6));
    for (int i = 0; i < numFocals; ++i) {
      firstPixel(new Point(int(random(w)), int(random(h))), new Point(int(random(w)), int(random(h))));  
    }
    run = true;
  }
}

void firstPixel(Point pixel, Point colorPixel) {  
  positions.add(pixel);
  visited[pixel.x][pixel.y] = true;  
  pixelToColorMatrix[pixel.x][pixel.y] = colorPixel;
  colorMatrixVisited[colorPixel.x][colorPixel.y] = true;  
  fill(colorMatrix[colorPixel.x][colorPixel.y]);
  rect(pixel.x, pixel.y, 1, 1);
  left--;
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

static int dRow[] = { - 1, 0, 1, 0 };
static int dCol[] = { 0, 1, 0, -1 };

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
  fill(0);
  // rect(closestColor.x, closestColor.y, 1, 1);
  
  // mark it
  colorMatrixVisited[closestColor.x][closestColor.y] = true;
  pixelToColorMatrix[next.x][next.y] = closestColor;
  color c = colorMatrix[closestColor.x][closestColor.y];
  fill(c);
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
  rect(next.x, next.y, 1,1);
  left--;
  return true;
}

Point chosenPixel, chosenColorPixel;
boolean run;
int left;

void draw() {
  
  
  if (run) {
    int max = min(1000, left);
    for (int i = 0; i < max; ++i) {
      boolean result = step();
      if (!result) {
        --i;
      }
    }
    if (shouldSaveFrame) {
      saveFrame(frameName);
    }
    
    if (left == 0) {
      saveResult();
      noLoop();
    }
  } else {
    if (img != null) {
      
      image(img, 0,0,w,h);
    }
  }
}

void saveResult() {
  PImage img  = get(0, 0, w, h);
  img.save("result.png");
  JSONArray arr = new JSONArray();
  int index = 0;
  for (int y = 0; y < h; ++y) {    
    for (int x = 0; x < w; ++x) {
      
      arr.setInt(index++, pixelToColorMatrix[x][y].x);
      arr.setInt(index++, pixelToColorMatrix[x][y].y);
      // arr2.setJSONArray(x, point);
    }
    // arr.setJSONArray(y, arr2);
  }
  
  saveJSONArray(arr, "data/pixelToColorMatrix.json");
}