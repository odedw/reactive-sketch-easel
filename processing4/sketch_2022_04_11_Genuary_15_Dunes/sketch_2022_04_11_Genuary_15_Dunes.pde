
boolean shouldSaveFrame = false;
PVector p1, c1, c2, p2;
float angle = radians(25);
float h;
PVector[] bezierPoints = new PVector[10000];
PImage sky;
color[] sunny = {#EDB055, #F9C268, #F2B759, #E5A448};
color[] shaded = {#AF6C28, #995B22, #CE883C,#9B5C21};
int index;
void setup() {
  size(1000,1000);
  
  sky = loadImage("data/guillaume-galtier-3YrppYQPoCI-unsplash.jpg");
  background(255); 
  strokeWeight(2);
  stroke(0);
  image(sky, 0, 0, width, height);
  
  // draw dune
  p1 = new PVector(width / 2, height / 2);
  c1 = new PVector(0, height * 0.75);
  c2 = new PVector(width, height * 0.75);
  p2 = new PVector(p1.x, height);
  
  
  h =  tan(angle) * p1.x;
  // fill(0);
  // beginShape();
  // vertex(p1.x, p1.y);
  // vertex( -1, p1.y + h);
  // vertex( -1, height + 1);
  // vertex(width + 1, height + 1);
  // vertex(width + 1, p1.y + h);
  // endShape(CLOSE);
  
  // bezier(p1.x, p1.y,c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
  
  for (int i = 0; i < bezierPoints.length; i++) {
    float t = i / float(bezierPoints.length);
    float x = bezierPoint(p1.x, c1.x, c2.x, p2.x, t);
    float y = bezierPoint(p1.y, c1.y, c2.y, p2.y, t);
    bezierPoints[i] = new PVector(x,y);
  }
  noStroke();
  
  for (int i = 0; i < width * height; ++i) {
    // PVector p = new PVector(random(width), random(height));
    PVector p = new PVector(i % width, i / width);
    PVector closest = findClosestPointOnLineByX(p.x);
    if (p.y < closest.y) {
      continue;
      // fill(#3388C7, 255 * (1 - p.y / height + 0.5));
    } else {
      closest = findClosestPointOnBezierByY(p.y);
      if (p.x < closest.x) {
        fill(randomColor(sunny), 255);
      } else {
        fill(randomColor(shaded), 255);
      }
    }
    circle(p.x, p.y, 1);
  }
}

color randomColor(color[] colors) {
  return colors[int(random(colors.length))];
}
void draw() {
  // if (index > width * height) return;
  // for (int i = 0; i < 10000; ++i) {
  //   noStroke();
  //   // PVector p = new PVector(random(width), random(height));
  //   PVector p = new PVector(index % width, index / width);
  //   index++;
  //   PVector closest = findClosestPointOnLineByX(p.x);
  //   if (p.y < closest.y) {
  //     continue;
  //     // fill(#3388C7, 255 * (1 - p.y / height + 0.5));
  //   } else {
  //     closest = findClosestPointOnBezierByY(p.y);
  //     if (p.x < closest.x) {
  //       fill(randomColor(sunny));
  //     } else {
  //       fill(randomColor(shaded));
  //     }
  //   }
  //   circle(p.x, p.y, 1);
  
  // }
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}

PVector findClosestPointOnBezierByY(float y) {
  PVector closest = bezierPoints[0];
  for (int i = 1; i < bezierPoints.length; ++i) {
    if (abs(y - bezierPoints[i].y) < abs(y - closest.y)) {
      closest = bezierPoints[i];
    }
  }
  return closest;
}

PVector findClosestPointOnLineByX(float x) {
  float y = tan(angle) * (x > width / 2 ? width - x : x);
  // println("y: " + y);
  // println("p1: " + p1);
  // println("x: " + x);
  return new PVector(x, p1.y + h - y);
}

boolean running = true;
void mousePressed() {
  // if (running) {
  //   noLoop();
  // } else{
  //   loop();
  // }
  // running = !running;
  // println("frameCount: " + frameCount);
  
  // PVector closest = findClosestPointOnBezierByY(mouseY);
  // if (closest.x < mouseX) {
  //   println("right");
  // } else 
  // {
  //   println("left");
  // }
  
  PVector closest = findClosestPointOnLineByX(mouseX);
  circle(closest.x, closest.y, 5);
  println(closest.y < mouseY ? "down" : "up");
}
