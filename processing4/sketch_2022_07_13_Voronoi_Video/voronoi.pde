class Voronoi {
  PGraphics pg;
  ArrayList<Coordinate> seeds;
  BfsState[] states;
  boolean[][] visited;
  
  Voronoi(PGraphics pg_, ArrayList<Coordinate> seeds_) {
    pg = pg_;
    seeds = seeds_;
    states = new BfsState[seeds.size()];
    for (int i = 0;i < seeds.size();i++) {
      Coordinate seed = seeds.get(i);
      if (seed.x >= 0 && seed.x < pg.width && seed.y >= 0 && seed.y < pg.height)
        states[i] = new BfsState(seed);
    }
    visited = new boolean[pg.width][pg.height];
  }
  
  class BfsState {
    ArrayList<Coordinate> cells, next;
    Coordinate seed;
    int r = 1;
    BfsState(Coordinate s) {
      seed = s;
      cells = new ArrayList<Coordinate>();
      cells.add(seed);
      next = new ArrayList<Coordinate>();
    }
    
    void switchNext() {
      ArrayList<Coordinate> temp = cells;
      cells = next;
      next = temp;
      next.clear();
    }
  }
  
  ArrayList<Coordinate> getUnvisitedNeighbors(Coordinate c, BfsState state, boolean[][] visited, int rows, int cols) {
    ArrayList<Coordinate> valid = new ArrayList<Coordinate>();
    for (int i = c.x - 1;i <=  c.x + 1;i++) {
      for (int j = c.y - 1;j <=  c.y + 1;j++) {
        if (i < 0 || i > cols - 1 || j < 0 || j > rows - 1) continue;
        if (dist(state.seed.x, state.seed.y, i, j) > state.r) continue;
        if (!visited[i][j]) valid.add(new Coordinate(i, j, c.c));
      }
    }
    return valid;
  }
  int count = 0;
  int percentage = 0;
  
  boolean step() {
    boolean allStacksEmpty = true;
    int index = 0;    
    do {
      allStacksEmpty = true;
      for (int i = 0; i < states.length; ++i) {
        BfsState state = states[i];
        
        //if empty continue
        if (state.cells.size() == 0) continue;
        
        allStacksEmpty = false;
        
        Coordinate c = state.cells.get(0);
        state.cells.remove(0);
        
        //already visited from another stack this frame
        if (visited[c.x][c.y]) continue;
        
        //mark
        visited[c.x][c.y] = true;
        pg.fill(c.c);
        pg.square(c.x, c.y, 1);
        count++;
        //add all unvisited neighbors
        state.next.addAll(getUnvisitedNeighbors(c, state, visited, height, width));
      }
      index++;
    } while(!allStacksEmpty);
    
    for (BfsState state : states) {
      state.switchNext();
      state.r++;
    }
    int nextPercentage = int(count * 100.0 / (pg.width * pg.height));
    if (percentage < nextPercentage) {
      percentage = nextPercentage;
      println(percentage + "%");
    }
    return index > 1;
  }
  
  void run() {
    pg.beginDraw();
    pg.noStroke();
    count = 0;
    while(step());
    
    pg.endDraw();
  }
}

