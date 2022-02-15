
boolean shouldSaveFrame = false;
PImage img;
void setup() {
  size(1000,1000);
  img = loadImage("blue725a.png");
  noStroke();
  rectMode(CENTER);
  
  // drawing
  // background(#124D6B); 
  image(img, 0,0,width , height);
  translate(width / 2, height / 2);
  
  strokeWeight(10);
  stroke(255);
  fill(0);
  rect(0,0,width / 2, height / 2);
}

void draw() {
  
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
  save("output.png");
}
