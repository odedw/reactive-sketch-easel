int GAP = 3;
int VERTICAL_GAP = 12;
int FRAME_GAP = 30;
int MIN_DISTANCE = 6;
ArrayList<Line> lines = new ArrayList<Line>();
color[] colors = {color(0), color(255, 0, 0), color(255, 255, 0), color(0, 0, 255)};
void setup() {
  size(1000,1000);
  strokeWeight(2);
  lines.add(new Line(VERTICAL_GAP, color(0), null));
  
}

void addLine() {
  Line lastLine = lines.get(lines.size() - 1);
  Line newLine;
  lines.add(new Line(lastLine.y + VERTICAL_GAP, colors[lines.size() % colors.length], lastLine));
}

// ArrayList<int> remove = new ArrayList<int>();
void draw() {
  if (frameCount % FRAME_GAP ==  0) {
    addLine();
  } 
  
  for (Line l : lines) {
    if (l.update()) 
      l.draw();
  }
}
