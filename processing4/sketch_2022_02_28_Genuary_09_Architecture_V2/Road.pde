class Road extends CityObject{
  boolean horizontal;
  Road(int col, int row, boolean horizontal) {
    super(col,row);
    this.w = horizontal ? cols : 4;
    this.h = horizontal ? 4 : rows;
    this.horizontal = horizontal;
    // this.check();
    this.mark();
    
    for (int i = this.col + gap; i < this.col + this.w - gap; i++) {
      for (int j = this.row + gap; j < this.row + this.h - gap; j++) {
        pixels[i][j].setHeight(size / 2, true);
      }
    }
  }
}