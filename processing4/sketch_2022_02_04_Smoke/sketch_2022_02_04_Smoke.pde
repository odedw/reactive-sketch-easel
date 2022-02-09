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