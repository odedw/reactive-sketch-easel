boolean renderLines = true;
boolean renderCircleLines = true;
boolean shouldSaveFrame = true;
int GAP = 3;
float ANGLE_DELTA = TWO_PI / 360;
int VERTICAL_GAP = 12;
int FRAME_GAP = 30;
int MIN_DISTANCE = 6;
ArrayList<Line> lines = new ArrayList<Line>();
ArrayList<CircleLine> circleLines = new ArrayList<CircleLine>();
color[] colors = {color(0,0,0,100), color(255, 0, 0,100), color(255, 255, 0,100), color(0, 0, 255,100)};
void setup() {
  size(1000,1000);
  background(200);
  strokeWeight(2);
  noFill();
  
  if (renderLines)
    lines.add(new Line(VERTICAL_GAP, color(0), null));
  
  if (renderCircleLines)
    circleLines.add(new CircleLine(VERTICAL_GAP, color(0), null));
}

void addLine() {
  Line lastLine = lines.get(lines.size() - 1);
  if (lastLine.y > height) return;
  Line newLine;
  lines.add(new Line(lastLine.y + VERTICAL_GAP, colors[lines.size() % colors.length], lastLine));
}

void addCircleLine() {
  CircleLine lastLine = circleLines.get(circleLines.size() - 1);
  if (lastLine.r > width) return;
  circleLines.add(new CircleLine(lastLine.r + VERTICAL_GAP, colors[circleLines.size() % colors.length], lastLine));
}

void draw() {
  if (frameCount % FRAME_GAP ==  0) {
    if (renderLines)
      addLine();
    
    if (renderCircleLines)
      addCircleLine();
  } 
  
  if (renderCircleLines) {
    for (CircleLine l : circleLines) {
      if (l.update()) 
        l.draw();
    }
  }
  
  if (renderLines) {
    for (Line l : lines) {
      if (l.update()) 
        l.draw();
    }
  }
  if (shouldSaveFrame) {
    saveFrame("output/frame-######.png");
  }
}
