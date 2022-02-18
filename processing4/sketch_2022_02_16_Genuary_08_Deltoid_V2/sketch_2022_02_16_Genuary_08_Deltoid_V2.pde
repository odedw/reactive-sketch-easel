boolean shouldSaveFrame = false;
int size = 480;
float squareAngle = 0;
float squareAngleStep = HALF_PI / (size / 2);
float circleDelta = 0;
float circleStep = size / (size * 2);
float r = size / 4;
ArrayList<PVector> points = new ArrayList<PVector>();

Stage squareStage = Stage.BOTTOM_RIGHT;
Stage circleStage = Stage.BOTTOM_RIGHT;
void setup() {
  size(1000,1000);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  noFill();
  strokeWeight(2);
}

PVector polarToCartesian(float r, float a) {
  return new PVector(cos(a) * r, sin(a) * r);  
}

void draw() {
  background(#e6e6e6); 
  PVector translatePoint = new PVector();
  PVector rectPoint = new PVector();
  PVector circlePoint = new PVector();
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
  
  pushMatrix();
  translate(translatePoint.x, translatePoint.y);
  rotate(squareAngle);
  rect(rectPoint.x, rectPoint.y, size, size);
  
  translate(rectPoint.x, rectPoint.y);
  circle(circlePoint.x, circlePoint.y, r);
  
  
  
  points.add(new PVector(screenX(circlePoint.x, circlePoint.y), screenY(circlePoint.x, circlePoint.y)));
  popMatrix();
  
  
  
  beginShape();
  for (PVector p : points) {
    vertex(p.x, p.y);
  }
  endShape();
  
  if (abs(squareAngle) >= HALF_PI) {
    squareAngle = 0;
    squareStage = squareStage.next();
  }
  
  if (circleDelta >= size / 2) {
    circleDelta = 0;
    circleStage = circleStage.next();
  }
  
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
