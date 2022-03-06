class RectBuilding extends CityObject{
  int gap = 1;
  RectBuilding(int row, int col) throws Exception{
    super(row,col);
    int min = 4;
    int max = 11;
    if (random(1) < 0.5) {
      this.w = this.h = int(random(min, max));
    } else {
      this.w = int(random(min, max));
      this.h = int(random(min, max));
    }
    this.height = int(random(1,10) * size + size);
    this.check();
    this.mark();
    
    for (int i = this.col + gap; i < this.col + this.w - gap; i++) {
      for (int j = this.row + gap; j < this.row + this.h - gap; j++) {
        pixels[i][j].setHeight(this.height);
      }
    }
    
    // println("Block Building ==== size: " + this.h + ", height: " + this.height);
  }
}