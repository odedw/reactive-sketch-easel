ArrayList<Point> positions = new ArrayList<Point>();
boolean[][] visited, colorMatrixVisited;
color[][] colorMatrix;
Point[][] pixelToColorMatrix;
Point[][] pixelToPrev;
boolean[][] bfsVisited;
int w,h, left;
PImage output;
int percent;
int[] time = new int[4];
PImage smoke(PImage input, int numFocalPoints, boolean relocateFocalPoints) {
  positions.clear();
  w = input.width;
  h = input.height;
  left = w * h;
  output = createImage(w, h, ARGB);
  output.loadPixels();
  
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
  
  pg.image(input, 0,0,w, h);
  pg.endDraw();
  for (int x = 0; x < w; ++x) {
    for (int y = 0; y < h; ++y) {
      colorMatrix[x][y] = pg.get(x, y);
    }
  }
  // println("finished init");
  // println("left: " + left);
  
  for (int i = 0; i < numFocalPoints; ++i) {
    Point p1 = new Point(int(random(w)), int(random(h)));
    Point p2 = relocateFocalPoints ? new Point(int(random(0,w)), int(random(0,h))) : p1;
    firstPixel(p1, p2);
  }
  
  while(left > 0) {
    step();
    int newPercent = int(100 - (100.0 * float(left) / (w * h)));
    if (percent != newPercent && newPercent % 10 == 0) {
      print(newPercent + "% ");
      percent = newPercent;
    }
  }
  println();
  output.updatePixels();
  return output; 
}

void firstPixel(Point pixel, Point colorPixel) {  
  // println("firstPixel: " + pixel);
  positions.add(pixel);
  visited[pixel.x][pixel.y] = true;  
  pixelToColorMatrix[pixel.x][pixel.y] = colorPixel;
  colorMatrixVisited[colorPixel.x][colorPixel.y] = true;
  output.pixels[getIndex(pixel.x, pixel.y)] = colorMatrix[colorPixel.x][colorPixel.y];
  left--;
  
}

void step() {
  int size = positions.size();
  if (size == 0) {
    return;
  }
  
  // get random pixel
  int index = int(random(size));
  Point pixel = positions.get(index);
  ArrayList<Point> neighbours = getNeighbours(pixel, false, visited);
  Point next = new Point(0,0);
  if (neighbours.size() == 0) {
    positions.remove(index);
    return;
  } else if (neighbours.size() == 1) { // no more unvisited neighbours, remove from positions 
    next = neighbours.get(0);
    positions.remove(index);
  } else {
    int nextIndex = int(random(neighbours.size()));
    next = neighbours.get(nextIndex);
    neighbours.remove(nextIndex);
  }
  
  visited[next.x][next.y] = true;
  positions.add(next);
  color c = getFill(next, pixel);
  output.pixels[getIndex(next.x, next.y)] = c;
  // output.set(next.x, next.y, c);
  
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

int getIndex(int x, int y) {
  return y * w + x;
} 

color getFill(Point next, Point current) {
  Point currentColor = pixelToColorMatrix[current.x][current.y];
  Point closestColor = findClosestUnvisitedColor(currentColor);
  if (closestColor == null) {
    println("getFill found nothing!");
    return color(0);
  }
  // mark it
  colorMatrixVisited[closestColor.x][closestColor.y] = true;
  pixelToColorMatrix[next.x][next.y] = closestColor;
  color c = colorMatrix[closestColor.x][closestColor.y];
  return c;
}


Point findClosestUnvisitedColor(Point currentColor) {
  for (int i = 0; i < w; ++i) {
    for (int j = 0; j < h; ++j) {
      bfsVisited[i][j] = false;
    }
  }  
  ArrayList<Point> toCheck = new ArrayList<Point>();
  toCheck.add(currentColor);
  bfsVisited[currentColor.x][currentColor.y] = true;
  while(toCheck.size() > 0) {
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
