class Coordinate{
  int row,col;
  Coordinate(int r, int c) {
    row = r;
    col = c;
  }
}

ArrayList<Coordinate> getNeighbors(T[][] matrix, int row, int col) {
  ArrayList<Coordinate> neighbors = new ArrayList<Coordinate>();
  for (int i = row - 1; i <= row + 1; i++) {
    for (int j = col - 1; j <= col + 1; j++) {
      if (row >=  0 && row < matrix.length && col >= 0 && col < matrix[i].length && (i != row || col != j)) {
        neighbors.add(new Coordinate(i,j));
      }
    }
  }
  return neighbors;
}