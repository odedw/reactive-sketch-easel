PImage img;
ArrayList<Point> positions = new ArrayList<Point>();
boolean[][] visited, colorMatrixVisited;
color[][] colorMatrix;
Point[][] pixelToColorMatrix;
Point[][] pixelToPrev;
boolean[][] bfsVisited;

void setup() {
  size(1200 ,1200);
  img = loadImage("jason-leung-UIZQfEZ1wUc-unsplash.jpg");
  // img = loadImage("Mona-Lisa-770x876.jpg");
  noStroke();
  background(#e6e6e6); 
  
  // initialize matrices  
  visited = new boolean[width][height];
  colorMatrixVisited = new boolean[width][height];
  pixelToColorMatrix = new Point[width][height];
  pixelToPrev = new Point[width][height];
  bfsVisited = new boolean[width][height];
  for (int i = 0; i < width; ++i) {
    for (int j = 0; j < height; ++j) {
      visited[i][j] = false; 
      colorMatrixVisited[i][j] = false; 
    }
  }
  
  // get image colors
  colorMatrix = new color[width][height];
  PGraphics pg = createGraphics(width, height);
  pg.beginDraw();
  
  pg.image(img, 0,0,width, height);
  pg.endDraw();
  for (int x = 0; x < width; ++x) {
    for (int y = 0; y < height; ++y) {
      colorMatrix[x][y] = pg.get(x, y);
    }
  }
  
  // first pixel
  Point pixel = new Point(int(random(width)), int(random(height)));
  positions.add(pixel);
  visited[pixel.x][pixel.y] = true;
  Point colorPixel = new Point(int(random(width)), int(random(height)));
  pixelToColorMatrix[pixel.x][pixel.y] = colorPixel;
  colorMatrixVisited[colorPixel.x][colorPixel.y] = true;
  fill(colorMatrix[colorPixel.x][colorPixel.y]);
  rect(pixel.x, pixel.y, 1, 1);
  println(pixel);
  
  
  
}


ArrayList<Point> getNeighbours(Point pos, boolean desiredState, boolean[][] visitedMatrix) {
  ArrayList<Point> result = new ArrayList<Point>();
  if (pos.x > 0 && visitedMatrix[pos.x - 1][pos.y] == desiredState) {
    result.add(new Point(pos.x - 1, pos.y));
  }
  if (pos.y > 0 && visitedMatrix[pos.x][pos.y - 1] == desiredState) {
    result.add(new Point(pos.x, pos.y - 1));
  }
  if (pos.x + 1 < width && visitedMatrix[pos.x + 1][pos.y] == desiredState) {
    result.add(new Point(pos.x + 1, pos.y));
  }
  if (pos.y + 1 < height && visitedMatrix[pos.x][pos.y + 1] == desiredState) {
    result.add(new Point(pos.x, pos.y + 1));
  }
  
  return result;
}

static int dRow[] = { - 1, 0, 1, 0 };
static int dCol[] = { 0, 1, 0, -1 };

Point findClosestUnvisitedColor(Point currentColor) {
  // println("findClosestUnvisited colorPos: " + pos);
  for (int i = 0; i < width; ++i) {
    for (int j = 0; j < height; ++j) {
      bfsVisited[i][j] = false;
    }
  }  
  ArrayList<Point> toCheck = new ArrayList<Point>();// getNeighbours(currentColor, false, bfsVisited);
  toCheck.add(currentColor);
  bfsVisited[currentColor.x][currentColor.y] = true;
  while(toCheck.size() > 0) {
    // if (toCheck.size() > width * height)
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
  return true;
}

void draw() {
  
  for (int i = 0; i < 1000; ++i) {
    boolean result = step();
    if (!result) {
      --i;
    }
  }
  saveFrame("output/genuary-06-######.png");
}

void mouseClicked() {
  step();
}
