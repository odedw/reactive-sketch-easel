PImage img;
ArrayList<PVector> positions = new ArrayList<PVector>();
boolean[][] visited;
color[][] colorMatrix;

void setup() {
  size(1000,1000);
  img = loadImage("jason-leung-UIZQfEZ1wUc-unsplash.jpg");
  stroke(0);
  strokeWeight(1);
  noFill();
  
  visited = new boolean[width][height];
  for (int i = 0; i < width; ++i) {
    for (int j = 0; j < height; ++j) {
      visited[i][j] = false; 
    }
  }
  positions.add(new PVector(int(random(width)), int(random(height))));
  
  
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
  
  background(#e6e6e6); 
  
}

ArrayList<PVector> getNeighbours(PVector pos) {
  ArrayList<PVector> result = new ArrayList<PVector>();
  for (int i = int(pos.x) - 1; i <= int(pos.x) + 1; ++i) {
    for (int j = int(pos.y) - 1; j <= int(pos.y) + 1; ++j) {
      
      // out of bounds
      if (i < 0 || j < 0 || (i == int(pos.x) && j == int(pos.y)) || i >= width || j >= height) {
        continue;
      }
      
      // already visited
      if (visited[i][j]) {
        continue;
      }
      
      result.add(new PVector(i, j));
    } 
  }
  
  return result;
}

void step() {
  int size = positions.size();
  if (size == 0) {
    return;
  }
  // get random pixel
  int index = int(random(size));
  PVector pos = positions.get(index);
  positions.remove(index);
  visited[int(pos.x)][int(pos.y)] = true;
  
  noStroke();
  fill(colorMatrix[int(pos.x)][int(pos.y)]);
  rect(pos.x, pos.y, 1, 1);
  
  // add neighbours
  positions.addAll(getNeighbours(pos));
}

void draw() {
  for (int i = 0; i < 10000; ++i) {
    
    step();
  }
}
