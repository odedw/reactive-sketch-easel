PImage img;
ArrayList<Point> positions = new ArrayList<Point>();
boolean[][] visited, colorMatrixVisited;
color[][] colorMatrix;
Point[][] pixelToColorMatrix;
Point[][] pixelToPrev;

void setup() {
  size(500,500);
  img = loadImage("jason-leung-UIZQfEZ1wUc-unsplash.jpg");
  noStroke();
  background(#e6e6e6); 
  
  // initialize matrices  
  visited = new boolean[width][height];
  colorMatrixVisited = new boolean[width][height];
  pixelToColorMatrix = new Point[width][height];
  pixelToPrev = new Point[width][height];
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
  // for (int i = pos.x - 1; i <= pos.x + 1; ++i) {
  //   for (int j = pos.y - 1; j <= pos.y + 1; ++j) {
  
  //     // out of bounds
  //     if (i < 0 || j < 0 || (i == pos.x && j == pos.y) || i >= width || j >= height) {
  //       continue;
  //     }
  
  //     if (visitedMatrix[i][j] != desiredState) {
  //       continue;
  //     }
  
  //     result.add(new Point(i, j));
  //   } 
  // }
  
  // for (Point p : result) {
  //   pixelToPrev[p.x][p.y] = pos;
  // }
  
  return result;
}

Point findClosestUnvisited(Point pos, boolean[][] visitedMatrix) {
  // println("findClosestUnvisited colorPos: " + pos);
  // ArrayList<Point> toCheck = getNeighbours(pos);
  // while(toCheck.size() > 0) {
  //   ArrayList<Point> currentList = (ArrayList<Point>)(toCheck.clone());
  //   toCheck.clear();
  //   for (int i = 0; i < currentList.size(); ++i) {
  //     Point current = currentList.get(i);
  //     if (!visitedMatrix[int(current.x)][int(current.y)]) {
  //       return current;
  //     }
  //     toCheck.addAll(getNeighbours(current));
  //   }
  // }
  return null;
}

void setFill(Point pos) {
  // println("======================setFill");
  // println("pos: " + pos);
  fill(colorMatrix[pos.x][pos.y]);
  
  // Point prev = pixelToPrev[int(pos.x)][int(pos.y)];
  // Point colorPos;
  // // first pixel
  // println("prev: " + prev);
  // if (prev == null) {
  //   println("first pixel");
  //   colorPos = new Point(int(random(width)), int(random(height)));
  // } else {
  //   // find the closest color to the previous color pixel 
  //   println("finding closest color");
  //   Point prevColorPos = pixelToColorMatrix[int(prev.x)][int(prev.y)];
  //   println("prevColorPos: " + prevColorPos);
  
  //   colorPos = findClosestUnvisited(prevColorPos, colorMatrixVisited);
  // }
  // println("colorPos: " + colorPos);
  
  // if (colorPos == null) {
  //   return;
  // }
  // pixelToColorMatrix[int(pos.x)][int(pos.y)] = colorPos;
  // colorMatrixVisited[int(colorPos.x)][int(colorPos.y)] = true; 
  // fill(colorMatrix[int(colorPos.x)][int(colorPos.y)]);
  
}

void step() {
  // println("======step");
  int size = positions.size();
  if (size == 0) {
    return;
  }
  // get random pixel
  int index = int(random(size));
  Point pixel = positions.get(index);
  ArrayList<Point> neighbours = getNeighbours(pixel, false, visited);
  Point next = new Point(0,0);
  // println("pixel - " + pixel);
  // println("neighbors - " + neighbours.size());
  if (neighbours.size() == 0) {
    return;
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
  setFill(next);
  rect(next.x, next.y, 1,1);
  
  // positions.remove(index);
  // visited[int(pos.x)][int(pos.y)] = true;
  
  // setFill(pos);
  // rect(pos.x, pos.y, 1, 1);
  
  // // add neighbours
  // positions.addAll(getNeighbours(pos));
}

void draw() {
  for (int i = 0; i < 10000; ++i) {
    
    step();
  }
}

void mouseClicked() {
  step();
}
