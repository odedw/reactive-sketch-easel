class Seed {
  int x,y;
  color c;
  Seed(int x_, int y_, color c_) {
    x = x_;
    y = y_;
    c = c_;
  }
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

void voronoi(PGraphics pg, Seed[] seeds) {
  ArrayList[] stacks = new ArrayList[seeds.length];
  
  for (int i = 0;i < seeds.length;i++) {
    stacks[i] = new ArrayList<Coordinate>();
    stacks[i].add(new Coordinate(seeds[i].x, seeds[i].y, seeds[i].c));
  }
  
  boolean[][] visited = new boolean[pg.width][pg.height];
  
  
  while(true) {
    boolean allStacksEmpty = true;
    pg.beginDraw();
    pg.noStroke();
    
    for (ArrayList stack : stacks) {
      // if empty continue
      if (stack.size() == 0) continue;
      
      allStacksEmpty = false;
      
      ArrayList<Coordinate> next = new ArrayList<Coordinate>();
      
      for (Coordinate c : (ArrayList < Coordinate > )stack) {
        // already visited from another stack this frame
        if (visited[c.x][c.y]) continue;
        
        // mark
        visited[c.x][c.y] = true;
        pg.fill(c.c);
        pg.square(c.x, c.y, 1);
        
        //add all unvisited neighbors
        next.addAll(getUnvisitedNeighbors(c, visited, height, width));
      }
      
      stack.clear();
      stack.addAll(next);
    }
    if (allStacksEmpty) break;
  }
  
  
  
  // float r = width / 2.0;
  // while(r>1) {
  //   for (Seed s : seeds) {
  //     pg.fill(s.c);
  //     pg.circle(s.x, s.y, r);
  //   }
  //   r -= 15.0;
  //   println(r);
  // }
  pg.endDraw();
}