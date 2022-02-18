boolean shouldSaveFrame = false;
int iterations = 5;
ArrayList<PVector> points = new ArrayList<PVector>();
float a1,a2,a3;
float angleDelta = 0.001;
float originAngle = 0;
//float r = 200;
void setup() {
  size(1000,1000);
  noFill();
  strokeWeight(2);
  ellipseMode(RADIUS);
}

PVector polarToCartesian(float r, float a) {
  return new PVector(cos(a) * r, sin(a) * r);  
}

void draw() {
  // background(#e6e6e6); 
  translate(width / 2, height / 2);
  // PVector origin = polarToCartesian(50, originAngle);
  float r = 600;
  float x = 0;//random( -width / 5,width / 5);//int(sin(frameCount / 100) * 100);
  float y = 0;//random( -height / 5,height / 5);
  float a = angleDelta * frameCount;
  // originAngle += 0.5;
  for (int i = 0;i < iterations;i++) {
    // circle(x,y,r);
    float newR = r * 3 / 4;
    PVector p = polarToCartesian(r - newR,a * frameCount);
    r = newR;
    a += angleDelta;
    if (i + 1 < iterations) {
      x += p.x;
      y += p.y;
    }
  }
  points.add(new PVector(x, y));
  int num = int(random(0, points.size()));
  println("num: " + num);
  if (num < 4) {
    return;
  }
  beginShape();
  for (int i = 0; i < num; ++i) {
    PVector p = points.get(points.size() - num);  
    vertex(p.x,p.y); 
    // println("p: " + p);
    
  }
  for (PVector p : points) {
    // vertex(p.x,p.y); 
  }
  endShape();
  //angleDelta+=deltaDelta;
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
