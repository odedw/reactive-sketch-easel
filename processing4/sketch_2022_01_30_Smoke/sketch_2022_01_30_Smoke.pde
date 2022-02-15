PImage img;
ArrayList<Point> positions = new ArrayList<Point>();
boolean[][] visited, colorMatrixVisited;
color[][] colorMatrix;
Point[][] pixelToColorMatrix;
Point[][] pixelToPrev;
boolean[][] bfsVisited;
int w = 1000;
int h = 1000;
int bg = 150;
void setup() {
  size(2000 ,1000);
  left = w * h;
  img = loadImage("images/output.png");
  // img = loadImage("photo-1444021465936-c6ca81d39b84.jpg");
  // img = loadImage("Mona-Lisa-770x876.jpg");
  noStroke();
  background(bg); 
  image(img, 0,0,w,h);
  
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
  
  // firstPixel(new Point(int(random(w)), int(random(h))), new Point(int(random(w)), int(random(h))));
  //  firstPixel(new Point(w,h/2), new Point(w+1,h/2));
  // run = true;
}

void firstPixel(Point pixel, Point colorPixel) {  
  positions.add(pixel);
  visited[pixel.x][pixel.y] = true;  
  pixelToColorMatrix[pixel.x][pixel.y] = colorPixel;
  colorMatrixVisited[colorPixel.x][colorPixel.y] = true;  
  fill(colorMatrix[colorPixel.x][colorPixel.y]);
  rect(pixel.x + w, pixel.y, 1, 1);
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
  fill(bg);
  rect(closestColor.x, closestColor.y, 1, 1);
  
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
  rect(next.x + w, next.y, 1,1);
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
    // saveFrame("output/genuary-06-######.png");
    
    if (left == 0) {
      PImage img  = get(w, 0, w, h);
      img.save("images/result.png");
      noLoop();
    }
  }
}

void mouseClicked() {
  if (chosenColorPixel == null) {
    if (mouseX > w) {
      return;
    }
    chosenColorPixel = new Point(mouseX, mouseY);
    println("color pixel chosen - " + chosenColorPixel);
  } else if (chosenPixel == null) {
    if (mouseX < w) {
      return;
    }
    chosenPixel = new Point(mouseX - w, mouseY);
    println("pixel chosen - " + chosenPixel);
    firstPixel(chosenPixel, chosenColorPixel);
    
    run = true;
  }
}
