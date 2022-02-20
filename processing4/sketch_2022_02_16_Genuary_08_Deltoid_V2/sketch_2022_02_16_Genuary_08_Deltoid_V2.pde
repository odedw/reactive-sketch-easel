boolean shouldSaveFrame = true;
int size = 480;
int squareAngleFrameCount = 600;
int circleFrameCount = 300;
float dotFrameCount = 1200;
int fadeFrameCount = 360;
int fadeFrameStart = 240;
color fromColor = color(0,255,0);
color toColor = color(0,0,0);



float squareAngle = 0;
float squareAngleStep = HALF_PI / squareAngleFrameCount;
float circleDelta = 0;
float r = size / 4;
float circleStep = r * 2 / circleFrameCount;
float dotAngle = 0;
float dotDelta = TWO_PI / dotFrameCount;
ArrayList<PVector> points = new ArrayList<PVector>();

Stage squareStage = Stage.BOTTOM_RIGHT;
Stage circleStage = Stage.BOTTOM_RIGHT;
PImage img;
void setup() {
  size(1000,1000);
  img = loadImage("blue725a.png");
  rectMode(CENTER);
  ellipseMode(RADIUS);
  noFill();
  strokeWeight(5);
  stroke(0,255,0);
}

PVector polarToCartesian(float r, float a) {
  return new PVector(cos(a) * r, sin(a) * r);  
}

void draw() {
  // image(img, 0,0,width,height);
  background(0);
  boolean doneWithFade = frameCount > fadeFrameStart + fadeFrameCount;
  int max = doneWithFade ? min((frameCount - fadeFrameStart - fadeFrameCount + 1) * 5, 5000) : 2;
  // if (max == 5000)
  // println("max: " + max);
  for (int i = 0; i < max; ++i) {
    // if (i % 1000 == 0) {
    //   println("i: " + i);
    // }
    PVector translatePoint = new PVector();
    PVector rectPoint = new PVector();
    PVector circlePoint = new PVector();
    float dotAngleComp = 0;
    if (squareStage == Stage.BOTTOM_RIGHT) {
      translatePoint = new PVector(width / 2,height / 2 + size);
      rectPoint = new PVector(size / 2, -size / 2);
      if (circleStage == Stage.BOTTOM_RIGHT) {
        circlePoint = new PVector(r - circleDelta, r);
      } else if (circleStage == Stage.BOTTOM_LEFT) {
        circlePoint = new PVector( -r, r - circleDelta);
      } else if (circleStage == Stage.TOP_LEFT) {
        circlePoint = new PVector( -r + circleDelta, -r);
      } else if (circleStage == Stage.TOP_RIGHT) {
        circlePoint = new PVector(r, -r + circleDelta);
      }
    } else if (squareStage == Stage.BOTTOM_LEFT) {
      translatePoint = new PVector(width / 2 - size,height / 2);
      dotAngleComp = -HALF_PI;
      rectPoint = new PVector(size / 2, size / 2);
      if (circleStage == Stage.BOTTOM_LEFT) {
        circlePoint = new PVector(r - circleDelta, r);
      } else if (circleStage == Stage.TOP_LEFT) {
        circlePoint = new PVector( -r, r - circleDelta);
      } else if (circleStage == Stage.TOP_RIGHT) {
        circlePoint = new PVector( -r + circleDelta, -r);
      } else if (circleStage == Stage.BOTTOM_RIGHT) {
        circlePoint = new PVector(r, -r + circleDelta);
      }
    } else if (squareStage == Stage.TOP_LEFT) {
      translatePoint = new PVector(width / 2,height / 2 - size);
      dotAngleComp = -PI;
      rectPoint = new PVector( -size / 2, size / 2);
      if (circleStage == Stage.TOP_LEFT) {
        circlePoint = new PVector(r - circleDelta, r);
      } else if (circleStage == Stage.TOP_RIGHT) {
        circlePoint = new PVector( -r, r - circleDelta);
      } else if (circleStage == Stage.BOTTOM_RIGHT) {
        circlePoint = new PVector( -r + circleDelta, -r);
      } else if (circleStage == Stage.BOTTOM_LEFT) {
        circlePoint = new PVector(r, -r + circleDelta);
      }
    } else if (squareStage == Stage.TOP_RIGHT) {
      translatePoint = new PVector(width / 2 + size,height / 2);
      dotAngleComp = -HALF_PI * 3;
      rectPoint = new PVector( -size / 2, -size / 2);
      if (circleStage == Stage.TOP_RIGHT) {
        circlePoint = new PVector(r - circleDelta, r);
      } else if (circleStage == Stage.BOTTOM_RIGHT) {
        circlePoint = new PVector( -r, r - circleDelta);
      } else if (circleStage == Stage.BOTTOM_LEFT) {
        circlePoint = new PVector( -r + circleDelta, -r);
      } else if (circleStage == Stage.TOP_LEFT) {
        circlePoint = new PVector(r, -r + circleDelta);
      }
    }
    
    squareAngle -= squareAngleStep;
    circleDelta += circleStep;
    dotAngle += dotDelta;
    if (frameCount > fadeFrameStart) {
      stroke(lerpColor(fromColor, toColor, min((frameCount - fadeFrameStart) / float(fadeFrameCount), 1)));
    }
    pushMatrix();
    translate(translatePoint.x, translatePoint.y);
    rotate(squareAngle);
    if (!doneWithFade) 
      rect(rectPoint.x, rectPoint.y, size, size);
    
    translate(rectPoint.x, rectPoint.y);
    translate(circlePoint.x, circlePoint.y);
    PVector dotPoint = polarToCartesian(r, dotAngle + dotAngleComp);
    if (!doneWithFade) {
      circle(0,0, r);
      circle(dotPoint.x, dotPoint.y, 5);
    }    
    
    
    points.add(new PVector(screenX(dotPoint.x,dotPoint.y), screenY(dotPoint.x,dotPoint.y)));
    popMatrix();
    
    
    
    
    
    if (abs(squareAngle) >= HALF_PI) {
      squareAngle = 0;
      squareStage = squareStage.next();
    }
    
    if (circleDelta >= r * 2) {
      circleDelta = 0;
      circleStage = circleStage.next();
    }
  }
  
  stroke(0,255,0);
  if (frameCount > fadeFrameStart + fadeFrameCount) {
    for (int i = 1; i < points.size(); ++i) {
      stroke(lerpColor(fromColor, toColor, i / points.size()));
      line(points.get(i - 1).x,points.get(i - 1).y, points.get(i).x,points.get(i).y);
    }
    points.clear();
  } else {
    beginShape();
    for (PVector p : points) {
      vertex(p.x, p.y);
    }
    endShape();
  }
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}


void mouseClicked() {
  save("output.png");
}