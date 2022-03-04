

int cols = 50;
int rows = 50;
int size = 10;
int gap = 0;
int[][] heights;
int fullWidth = cols * size + gap * (cols - 1);
int fullHeight = rows * size + gap * (rows - 1);
boolean shouldSaveFrame = false;
float magicAngle = atan(cos(QUARTER_PI));
Pixel[][] pixels = new Pixel[cols][rows];

void setup() {
  size(1000,1000, P3D);
  smooth();
  noStroke();
  heights = new int[cols][rows];
  for (int i = 0; i < cols; ++i) {
    for (int j = 0; j < rows; ++j) {
      pixels[i][j] = new Pixel(i, j, int(random(size, size * 10)));
    }
  }
  
  
}

void draw() {
  // if (frameCount % 100 == 0) {
  pixels[int(random(cols))][int(random(rows))].setHeight(int(random(size * 10)));
  // }
  stroke(0);
  strokeWeight(1);
  background(#e6e6e6);
  lights();
  pointLight(100, 100, 100, 10, 30, 50);
  ortho( -400, 400, 400, -400, 0, 2000);
  // isometric
  translate(width / 2, height / 2);
  rotateX(magicAngle);
  rotateY( -QUARTER_PI);
  // pushMatrix();
  // int x = width;//int(map(mouseX, 0, width, -width / 2, width / 2));
  // int y = -height;//int(map(mouseY, 0, height, height / 2, -height / 2));
  // int z = 0;//int(map(mouseX, 0, width, -width / 2, width / 2));
  // translate(x,y,z);
  // fill(0);
  // sphere(10);
  // pointLight(100,100,100,  0,0,0);
  // popMatrix();
  
  for (int i = 0; i < cols; ++i) {
    for (int j = 0; j < rows; ++j) {
      pixels[i][j].step();
      pixels[i][j].draw();
    }
  }
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

void mousePressed() {
  println("mouseX: " + map(mouseX, 0, width, 0, 100));
  println("mouseY: " + map(mouseY, 0, height, 0, 100));
}
