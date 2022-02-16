class Bfs{
  boolean[][] visited;
  ArrayList<Point> points = new ArrayList<Point>();
  boolean firstStep = true;
  Point start;
  Callback c;
  Rect outerBound, innerBound;
  Bfs(Rect outerBound, Rect innerBound, Point start, Callback c) {
    this.visited = new boolean[outerBound.w][outerBound.h];
    for (int i = 0; i < outerBound.w; ++i) {
      for (int j = 0; j < outerBound.h; ++j) {
        boolean isVisited = innerBound != null && innerBound.contains(i + outerBound.x, j + outerBound.y);
        this.visited[i][j] = isVisited;
      }
    }
    this.start = start;
    this.c = c;
    this.outerBound = outerBound;
    this.innerBound = innerBound;
  }
  
  ArrayList<Point> getNeighbours(Point p) {
    ArrayList<Point> result = new ArrayList<Point>();
    // println("getNeighbours");
    ArrayList<Point> toCheck = new ArrayList<Point>();
    toCheck.add(new Point(p.x - 1, p.y));
    toCheck.add(new Point(p.x , p.y - 1));
    toCheck.add(new Point(p.x + 1, p.y));
    toCheck.add(new Point(p.x , p.y + 1));
    for (Point n : toCheck) {
      // println("n " + n);
      // println("contains " + this.outerBound.contains(n.x, n.y));
      
      if (this.outerBound.contains(n.x + this.outerBound.x, n.y + this.outerBound.y) && !visited[n.x][n.y]) {
        // println("add " + n);
        result.add(n);
      }
    }
    
    return result;
  }
  
  boolean step() {
    // println("step");
    Point point;
    if (firstStep) {
      point = start;      
      firstStep = false;
      this.visited[point.x][point.y] = true;
    } else {
      if (this.points.size() == 0) {
        // println("size 0");
        return false;
      }
      
      int index = floor(random(0, this.points.size()));
      
      point = this.points.get(index);  
      this.points.remove(index);
    }
    
    //mark point
    // println("point: " + point);
    this.c.callback(point);
    
    // add neighbours
    ArrayList<Point> neighbours = this.getNeighbours(point);
    // println("size " + neighbours.size());
    for (Point n : neighbours) {
      this.points.add(n);
      this.visited[n.x][n.y] = true;
      
      // println("added");
    } 
    
    return true;
  }
}
