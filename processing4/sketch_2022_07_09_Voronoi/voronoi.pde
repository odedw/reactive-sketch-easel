class Voronoi {
  PGraphics pg;
  Coordinate[] seeds;
  ArrayList[] stacks;
  boolean[][] visited;
  
  Voronoi(PGraphics pg_, Coordinate[] seeds_) {
    pg = pg_;
    seeds = seeds_;
    stacks = new ArrayList[seeds.length];
    for (int i = 0;i < seeds.length;i++) {
      stacks[i] = new ArrayList<Coordinate>();
      stacks[i].add(new Coordinate(seeds[i].x, seeds[i].y, seeds[i].c));
    }
    visited = new boolean[pg.width][pg.height];
  }
  
  ArrayList<Coordinate> getUnvisitedNeighbors(Coordinate c, boolean[][] visited, int rows, int cols) {
    ArrayList<Coordinate> valid = new ArrayList<Coordinate>();
    for (int i = c.x - 1;i <=  c.x + 1;i++) {
      for (int j = c.y - 1;j <=  c.y + 1;j++) {
        if (i < 0 || i > cols - 1 || j < 0 || j > rows - 1) continue;
        if (!visited[i][j]) valid.add(new Coordinate(i, j, c.c));
      }
    }
    return valid;
  }
  
  boolean step() {
    boolean allStacksEmpty = true;
    ArrayList[] nextStacks = new ArrayList[seeds.length];
    for (int i = 0;i < seeds.length;i++) {
      nextStacks[i] = new ArrayList<Coordinate>();     
    }
    
    // for (ArrayList stack : stacks) {
    do {
      allStacksEmpty = true;
      for (int i = 0; i < stacks.length; ++i) {
        ArrayList<Coordinate> stack = stacks[i];
        
        //if empty continue
        if (stack.size() == 0) continue;
        
        allStacksEmpty = false;
        
        //ArrayList<Coordinate> next = new ArrayList<Coordinate>();
        Coordinate c = stack.get(0);
        stack.remove(0);
        
        //for (Coordinate c : (ArrayList < Coordinate >)stack) {
        //already visited from another stack this frame
        if (visited[c.x][c.y]) continue;
        
        //mark
        visited[c.x][c.y] = true;
        pg.fill(c.c);
        pg.square(c.x, c.y, 1);
        
        //add all unvisited neighbors
        nextStacks[i].addAll(getUnvisitedNeighbors(c, visited, height, width));
      // }
        
        //stack.clear();
        //stack.addAll(next);
      }
    } while(!allStacksEmpty);
    
    stacks = nextStacks;
    return !allStacksEmpty;
  }
  
  void run() {
    pg.beginDraw();
    pg.noStroke();
    
    
    while(step()) {
    }
    
    pg.endDraw();
  }
}

