FlowField field;
boolean isRunning = true;
void setup() {
  size(1000,1000);
  stroke(0);
  fill(0);
  field = new FlowField(0.01);
  background(#e6e6e6);
  field.draw();
}

void draw() {
  // for (int i = 0; i < 100; ++i) {
  //   pushMatrix();
    
  //   int x = int(random(0, width));
  //   int y = int(random(0, height));
  //   translate(x, y);
  //   rotate(field.get(x,y, 0, TWO_PI));
  //   line( -10,0,10,0);
  //   popMatrix(); 
  // }
}

void mousePressed() {
  isRunning = !isRunning;
  if (isRunning) loop(); else noLoop();
}
